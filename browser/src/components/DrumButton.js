import React, {Component} from 'react';


class DrumButton extends Component {

    constructor(props) {
        super(props);
        this.drum = props.drum;
        this.onDrumHit = props.onDrumHit;

        this.click = this.click.bind(this);

        this.state = {active: false};
    }


    click() {
        this.onDrumHit(this.drum.key)
    }

    render() {
        return (
            <div className={`drum-button ${this.state.active ? "active" : ""}`} onClick={this.click}>
                <span>{this.drum.drumSound}</span>
            </div>
        );
    }
}

export default DrumButton;
