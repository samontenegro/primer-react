import React, { Component } from 'react';
import App from './App';
import Menu from './Menu';

class Main extends Component {

    state = {
        playing: false,
        completed: false,
        diff: 2,
    }

    playHook = (diff) => {
        this.setState({diff: diff});
    }

    initGame = () => {
        let id = setInterval(() => {
            this.setState({playing: true});
            clearInterval(id);
        }, 500);
        
    }

    render () {
        return (
            <div className="main">
                <h1 className="title">Primer</h1>
                {
                    this.state.playing ? 
                    <App diff={this.state.diff}/> :
                    <Menu playHook={this.playHook} init={this.initGame}/>
                    
                }
            </div>
        )
    }
}

export default Main