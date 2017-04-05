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
    x(point, index) {
        return (index / (this.props.data.length - 1)) * this.props.width;
    }
    y(point) {
        return -((((point.price - this.props.min) / (this.props.max - this.props.min)) * this.props.height) - this.props.height);
    }
    computePath() {
        return this.props.data.map((point, index, list) => {
            return [this.x(point, index), this.y(point)].join(',');
        }).join(' ');
    }
}
export default Line;