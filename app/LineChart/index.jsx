import React from 'react';
import Line from './Line.jsx'
import { helpers } from '../helpers/index.jsx';

class LineChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.calculateCanvasState(props);
    }
    componentWillReceiveProps(nextprops) {
        this.setState(this.calculateCanvasState(nextprops));
    }
    calculateCanvasState(nextprops) {
        const snpreduced = nextprops.snpdata.reduce(priceRangeFinder, {
            min: Infinity,
            max: 0
        });
        return nextprops.capdata.reduce(priceRangeFinder, snpreduced);

        function priceRangeFinder(memo, point) {
            const price = point.price;
            memo.min = Math.min(memo.min, price);
            memo.max = Math.max(memo.max, price);
            return memo;
        }
    }
    range() {
        const state = this.state;
        const min = this.min();
        return min === Infinity ? 100 : this.max() - min;
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
    line(color, data) {
        const width = this.width();
        const height = this.height();
        return <Line
            color={color}
            height={height}
            width={width}
            min={this.state.min}
            max={this.state.max}
            data={data}/>
    }
    render(){
        const component = this;
        const height = component.height();
        const width = component.width();
        return (
        <div
            className="chart-container">
            <svg
                height={height}
                width={width}
                viewBox={[-10, -10, width + 20, height + 20].join(' ')} >
                <g>
                { component.line('black', component.props.snpdata) }
                </g>
            </svg>
       </div>);
    }
}
export default LineChart;