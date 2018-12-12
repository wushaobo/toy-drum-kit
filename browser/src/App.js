import React, {Component} from 'react';
import './App.css';

import Lane from "./components/Lane";
import drumList from "./model";
import Sound from "./sound";

class App extends Component {

    constructor(props) {
        super(props);

        this._drums = drumList()
        this._sound = new Sound()
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
                            return <Lane key={i} drum={drum} sound={this._sound}/>;
                        })
                    }
                </div>
            </div>
        );
    }
}

export default App;
