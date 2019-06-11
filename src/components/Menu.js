import React, { Component } from 'react';

class Menu extends Component {

    state = {
        difficulty: 2,
    }

    diffClick = (e) => {
        let diff
        if (e.target !== e.currentTarget) {
            Array.from(e.currentTarget.children).forEach(
                function (child) {
                    child.classList.remove('selected')
                }
            );
            diff = parseInt(e.target.id);
            e.target.classList.toggle('selected');
            this.setState({difficulty: diff});
            return diff
        }
    }

    render () {
        return (
            <div className="menu">
                <div className="menu-container">
                    <h2>A game about finding primes!</h2>
                    <hr/>
                    <div className="menu-content">
                        <p>How to play:</p>
                        <ul>
                            <li>
                                Choose your difficulty<br/>
                                <div id="level" onClick={(e) => {this.props.playHook(this.diffClick(e))}}>
                                    <div className="difficulty selected" id="2">
                                        Easy<br/>2×2
                                    </div>
                                    <div className="difficulty" id="4">
                                        Medium<br/>4×4
                                    </div>
                                    <div className="difficulty" id="6">
                                        Hard<br/>6×6
                                    </div>
                                </div>
                            </li>
                            <li>
                                Select all the prime numbers (but <strong>only</strong> the prime numbers) and then tap the timer before it runs out!
                            </li>
                        </ul>
                    </div>
                    <hr/>
                </div>
                <div id="start" onClick={(e) => {
                    e.currentTarget.classList.toggle('selected')
                    this.props.init();
                    }}>
                    <p className="init">Let's go!</p>
                </div>
            </div>
        )
    }
}

export default Menu