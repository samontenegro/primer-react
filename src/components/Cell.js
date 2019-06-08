import React, { Component } from 'react';

class Cell extends Component {
    
    handleClick= (e) => {
        e.target.classList.toggle('selected');
    };

    render () {
        let fontSize;
        let orientation = window.screen.orientation.type;

        if (orientation === "portrait-primary") {
            fontSize = { val: 80, unit: 'vw' };
        } else {
            fontSize = { val: 70, unit: 'vh' };
        }

        let cellWidth = (100 / this.props.n) - 2;
        let sizes = {
            width: `${cellWidth}%`,
            height: `${cellWidth}%`,
            fontSize: `${(0.3 * fontSize.val / this.props.n)}${fontSize.unit}`,
        };

        return (
            <div className="cell" style={sizes} onClick={this.handleClick}>{this.props.value}</div>
        )
    }
}
export default Cell