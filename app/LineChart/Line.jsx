import React from 'react';
class Line extends React.Component {
    render() {
        const path = this.computePath();
        return <polyline
            fill="none"
            stroke={this.props.color}
            strokeWidth="3"
            points={path}/>
    }
    computePath() {
        return this.props.data.map((point, index, list) => {
            let y = -((((point.price - this.props.min) / (this.props.max - this.props.min)) * this.props.height) - this.props.height);
            let x = (index / (list.length - 1)) * this.props.width;
            return [x, y].join(',');
        }).join(' ');
    }
}
export default Line;