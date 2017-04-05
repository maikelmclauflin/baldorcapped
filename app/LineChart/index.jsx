import React from 'react';

class BusinessLineChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.calculateCanvasState(props);
    }
    componentWillReceiveProps(nextprops) {
        this.setState(this.calculateCanvasState(nextprops));
    }
    calculateCanvasState(nextprops) {
        var data = nextprops.data;
        return data.reduce(function (memo, point) {
            memo.min = Math.min(memo.min, point.price);
            memo.max = Math.max(memo.max, point.price);
            return memo;
        }, {
            min: Infinity,
            max: 0
        });
    }
    range() {
        const state = this.state;
        const min = this.min();
        return min === Infinity ? 100 : this.max() - min;
    }
    forEachPoint(fn) {
        return this.props && this.props.data && this.props.data.map(fn);
    }
    max() {
        return this.state.max || 100;
    }
    min() {
        return this.state.min === Infinity ? 100 : this.state.min;
    }
    width() {
        return window.innerWidth;
    }
    height() {
        return 250;
    }
    render(){
        const component = this;
        const width = component.width();
        const height = component.height();
        const range = component.range();
        const path = component.forEachPoint(function (point, index, list) {
            let y = ((component.state.max - point.price) / range) * height;
            let x = (index / (list.length - 1)) * window.innerWidth;
            return [x, y].join(',');
        });
        return (
        <div
            className="chart-container">
            <svg
                height={height}
                width={width}
                viewBox={[-10, -10, width + 20, height + 20].join(' ')} >
                <g>
                    <polyline
                        fill="none"
                        stroke="black"
                        strokeWidth="3"
                        points={ path && path.join(' ') }/>
                </g>
            </svg>
       </div>);
    }
}
export default BusinessLineChart;