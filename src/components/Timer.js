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
                    component.setState({currentTime: t-1});
                    clearInterval(timer);
                }
            }, 1000);
        return timer
    }

    componentWillMount () {
        this.setState({timerId: this._startTimer(this.props.maxTime)});
    }

    resetTime = () => {
        clearInterval(this.state.timerId);
        this.setState({
            currentTime: this.props.maxTime,
            timerId: this._startTimer(this.props.maxTime),
        });
    }

    render () {
        return (
            <div id="timer">
                <p>{this.state.currentTime}</p>
                <button id="fuck" onClick={() => {
                    this.resetTime();
                    this.props.acceptRound();
                    }}>
                    click me
                </button>
            </div>
        )
    }

}

export default Timer