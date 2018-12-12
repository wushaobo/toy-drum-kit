import React, {Component} from 'react';
import './App.css';

import Lane from "./components/Lane";
import drumList from "./model";
import Sound from "./sound";
import AutoBot from "./autoBot";
import Visualization from "./visualization";

class App extends Component {

    constructor(props) {
        super(props);

        this._drums = drumList()
        this._sound = new Sound()
        this._visualization = new Visualization()
        this._autoBot = new AutoBot(this._sound, this._visualization)
    }

    componentDidMount() {
        this._sound.load()
    }

    render() {
        return (
            <div className="app">
                <div className="playground">
                    {
                        this._drums.map((drum, i) => {
                            return <Lane key={i} drum={drum} sound={this._sound}
                                         visualization={this._visualization}
                                         autoBot={this._autoBot}/>;
                        })
                    }
                </div>
            </div>
        );
    }
}

export default App;
