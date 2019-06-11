import React, { Component } from 'react';

class Cell extends Component {
    
    state = {
        selected: false,
    }

    handleClick = (e) => {
        e.target.classList.toggle('selected');
        if (!this.state.selected) {
            this.setState({selected: true});
            return {id: this.props.id, selected: true}
        } else {
            this.setState({selected: false});
            return {id: this.props.id, selected: false}
        }
    };

    render () {
        let fontSize;
        let orientation = window.matchMedia("(orientation: landscape)");

        if (orientation.matches) {
            fontSize = { val: 70, unit: 'vh' };
        } else {
            fontSize = { val: 80, unit: 'vw' };
        }

        let cellWidth = (100 / this.props.n) - 2;
        let sizes = {
            width: `${cellWidth}%`,
            height: `${cellWidth}%`,
            fontSize: `${(0.3 * fontSize.val / this.props.n)}${fontSize.unit}`,
        };

        return (
            <div className="cell" style={sizes} onClick={(e) => {
                // this.handleClick(e);
                this.props.cellHook(this.handleClick(e));
                }}>
                {this.props.value}
            </div>
        )
    }
}
export default Cell