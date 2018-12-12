import React, {Component} from 'react';


class DrumButton extends Component {

    constructor(props) {
        super(props);
        this.drum = props.drum;
        this.onDrumHit = props.onDrumHit;

        this.strike = this.strike.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keypress', this._playSound());
    }

    _playSound() {
        const hotKey = this.drum.hotKey;

        return (event) => {
            const code = String.fromCharCode(event.keyCode);

            if (code.toUpperCase() !== hotKey.toUpperCase()) {
                return
            }

            this.strike()
        }
    }

    strike() {
        this.onDrumHit(this.drum.key);
    }

    render() {
        return (
            <div className='drum-button' onClick={this.strike}>
                <div>{this.drum.drumSound}</div>
                <div className='hot-key'>{this.drum.hotKey}</div>
            </div>
        );
    }
}

export default DrumButton;
