import React, {Component} from 'react';


class DrumButton extends Component {

    constructor(props) {
        super(props);
        this.drum = props.drum;
        this.onDrumHit = props.onDrumHit;

        this.strike = this.strike.bind(this);
        this._buttonId = `drumButton${this.drum.key}`
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
        this._applyStrikeEffect();
        this.onDrumHit(this.drum.key);
    }

    _applyStrikeEffect() {
        const element = document.getElementById(this._buttonId);

        element.classList.add('highlight');
        const eventHandler = () => {
            element.classList.remove('highlight');
            element.removeEventListener("animationend", eventHandler);
        };
        element.addEventListener("animationend", eventHandler);
    }

    render() {
        return (
            <div id={this._buttonId} className='drum-button' onClick={this.strike}>
                <div className="background">
                    <div>{this.drum.drumSound}</div>
                    <div className='hot-key'>{this.drum.hotKey}</div>
                </div>
            </div>
        );
    }
}

export default DrumButton;
