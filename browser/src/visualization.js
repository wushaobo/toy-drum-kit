class Visualization {

    constructor() {
        this._canvasShapesMap = {}
    }

    _drawAll(context, shapes) {
        shapes.forEach(rectangle => {
            context.beginPath();
            context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
            context.fillStyle = rectangle.color;
            context.fill();
            context.strokeStyle = 'white';
            context.stroke();
        });
    }

    _updateCanvasShapesPos(canvas, shapes) {
        let retShapes = [];

        shapes.forEach(shape => {
            const time = (new Date()).getTime() - shape.startTime;
            const linearSpeed = 30;
            const newY = (canvas.height - shape.height) - linearSpeed * time / 1000;
            if (newY > -shape.height) {
                shape.y = newY;
                retShapes.push(shape)
            }
        });

        return retShapes;
    }

    _animate(canvas, context, note) {
        let shapes = this._canvasShapesMap[note];
        this._drawAll(context, shapes);

        shapes = this._updateCanvasShapesPos(canvas, shapes);
        this._canvasShapesMap[note] = shapes;

        if (shapes.length !== 0) {
            requestAnimationFrame(() => {
                context.clearRect(0, 0, canvas.width, canvas.height);
                this._animate(canvas, context, note)
            })
        } else {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    _initShape(canvas, shapeHeight, color) {
        return {
            x: 0,
            y: canvas.height - shapeHeight,
            width: canvas.width,
            height: shapeHeight,
            startTime: (new Date()).getTime(),
            color: color
        };
    }

    visualizeHit(note, color, shapeHeight = 6) {
        if (!this._canvasShapesMap[note]) {
            this._canvasShapesMap[note] = []
        }

        const canvas = document.getElementById(`canvas-${note}`);
        const context = canvas.getContext('2d');

        this._canvasShapesMap[note].push(this._initShape(canvas, shapeHeight, color));
        this._animate(canvas, context, note);
    }
}

export default Visualization;
