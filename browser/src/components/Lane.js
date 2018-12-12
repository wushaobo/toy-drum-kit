import React, {Component} from 'react';
import DrumButton from "./DrumButton";


class Lane extends Component {

    render() {
        return (
            <div className="lane">
                <div className="display-tunnel">

                </div>

                <DrumButton drum={this.props.drum} sound={this.props.sound}/>
            </div>
        );
    }
}

export default Lane;
