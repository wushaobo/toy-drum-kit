import React, {Component} from 'react';
import DrumButton from "./DrumButton";
import Tone from "tone";


class Lane extends Component {

    constructor(props) {
        super(props);

        this.drumHit = this.drumHit.bind(this)
    }

    drumHit(note) {
        this.props.sound.hit(note)
        this.props.visualization.visualizeHit(note, '#00FFFF')
        this._recordInput(note);
    }

    _recordInput(note) {
        const time = Tone.now()
        this.props.autoBot.startRecording(note, time)
        this.props.autoBot.pauseRecording(note, time + 2)
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
