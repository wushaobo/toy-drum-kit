import React, {Component} from 'react';
import DrumButton from "./DrumButton";
import Visualization from "../visualization";


class Lane extends Component {

    constructor(props) {
        super(props);

        this.drumHit = this.drumHit.bind(this)
        this._visualization = new Visualization()
    }

    drumHit(note) {
        this.props.sound.hit(note)
        this._visualization.visualizeHit(note)
    }

    render() {
        return (
            <div className="lane">
                <canvas id={`canvas-${this.props.drum.key}`}></canvas>

                <DrumButton drum={this.props.drum} onDrumHit={this.drumHit}/>
            </div>
        );
    }
}

export default Lane;
