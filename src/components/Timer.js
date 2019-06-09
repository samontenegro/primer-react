import React, { Component } from 'react';

class Timer extends Component {

    state = {
        currentTime: this.props.maxTime,
        timerId: null,
    }

    _startTimer = (time) => {
        let t = time;
        let component = this;
        let timer = setInterval(
            function () {
                if (t > 1) {
                    t -= 1;
                    component.setState({currentTime: t});
                } else {
                    component.setState({currentTime: `Time's up!`});
                    clearInterval(timer);
                }
            }, 1000);
        return timer
    }

    componentWillMount () {
        this.setState({timerId: this._startTimer(this.props.maxTime)});
    }

    resetTime = () => {
        if (this.state.currentTime >= 1) {
            clearInterval(this.state.timerId);
            this.setState({
                currentTime: this.props.maxTime,
                timerId: this._startTimer(this.props.maxTime),
            });
            return this.state.currentTime
        }
    }

    render () {
        return (
            <div id="timer" className={
                this.state.currentTime === `Time's up!` ? "ended" : "running"} 
                onClick={() => {this.props.acceptRound(this.resetTime,this.state.currentTime)}}>
                <p>{this.state.currentTime}</p>
            </div>
        )
    }

}

export default Timer