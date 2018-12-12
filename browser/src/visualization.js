class Visualization {

    constructor() {
        this._canvasShapes = []
    }

    _drawAll(context) {
        this._canvasShapes.forEach(rectangle => {
            context.beginPath();
            context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
            context.fillStyle = '#00FFFF';
            context.fill();
        });
    }

    _updateAllShapePos(canvas, shapes) {
        let retShapes = [];

        shapes.forEach(shape => {
            const time = (new Date()).getTime() - shape.startTime;
            const linearSpeed = 70;
            const newY = (canvas.height - shape.height) - linearSpeed * time / 1000;
            if (newY > -shape.height) {
                shape.y = newY;
                retShapes.push(shape)
            }
        });

        return retShapes;
    }

    _animate(canvas, context) {
        this._drawAll(context);

        this._canvasShapes = this._updateAllShapePos(canvas, this._canvasShapes);

        if (this._canvasShapes.length !== 0) {
            requestAnimationFrame(() => {
                context.clearRect(0, 0, canvas.width, canvas.height);
                this._animate(canvas, context)
            })
        } else {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    _initShape(canvas, shapeHeight) {
        return {
            x: 0,
            y: canvas.height - shapeHeight,
            width: canvas.width,
            height: shapeHeight,
            startTime: (new Date()).getTime()
        };
    }

    visualizeHit(note, shapeHeight = 10) {
        const canvas = document.getElementById(`canvas-${note}`);
        const context = canvas.getContext('2d');

        this._canvasShapes.push(this._initShape(canvas, shapeHeight));
        this._animate(canvas, context);
    }
}

export default Visualization;
