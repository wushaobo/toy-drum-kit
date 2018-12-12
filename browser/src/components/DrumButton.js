import React, {Component} from 'react';


class DrumButton extends Component {

    constructor(props) {
        super(props);
        this.drum = props.drum;

        this.touchStart = this.touchStart.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.click = this.click.bind(this);

        this.state = {active: false};
    }

    touchStart(e) {
        console.log("touchStart");
        this.setState({active: true});
    }

    touchEnd(e) {
        console.log("touchEnd");
        this.setState({active: false});
    }

    mouseDown(e) {
        console.log("mouseDown");
        this.setState({active: true});
    }

    mouseUp(e) {
        console.log("mouseUp");
        this.setState({active: false});
    }

    click(e) {
        console.log("click", this.drum.key);
        this.props.onDrumHit(this.drum.key)
    }

    render() {
        return (
            <div className={`drum-button ${this.state.active ? "active" : ""}`} onTouchStart={this.touchStart} onTouchEnd={this.touchEnd}
                 onMouseDown={this.mouseDown} onMouseUp={this.mouseUp} onClick={this.click}>
                <span>{this.drum.drumSound}</span>
            </div>
        );
    }
}

export default DrumButton;
