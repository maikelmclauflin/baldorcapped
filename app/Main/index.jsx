import React from 'react';
import Slider, { Range } from 'rc-slider';
import { helpers } from '../helpers/index.jsx';
import LineChart from '../LineChart/index.jsx';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const TooltipRange = createSliderWithTooltip(Slider.Range);

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            years: [2000, 2008],
            cap: 5,
            minYear: 1996,
            maxYear: 2016,
            data: []
        };
    }
    componentWillMount() {
        helpers.getStocks().then((data) => {
            const min = new Date('1996-01-01');
            return helpers.filterStocks(data, min.toISOString());
        }).then((subset) => {
            const transformed = helpers.transformStocks(subset);
            this.setState({
                data: transformed
            });
        }).catch(function (e) {
            console.log(e);
        });
    }
    updateYear(years) {
        this.setState({
            years: years
        });
    }
    updateCap(cap) {
        this.setState({
            cap: cap
        });
    }
    minYear() {
        return this.state.years[0];
    }
    maxYear() {
        return this.state.years[1];
    }
    subsetData() {
        const min = this.minYear();
        const max = this.maxYear();
        return this.state.data.filter(function (point) {
            const year = point.year;
            return year >= min && year <= max;
        });
    }
    render() {
        const data = this.state.data;
        const subset = this.subsetData(data);
        const capped = helpers.generateCappedPoints(subset, this.state.cap);
    	return (
    	<div>
            <Slider
                min={1}
                max={20}
                value={this.state.cap}
                onChange={(e) => this.updateCap(e)}/>
    		<TooltipRange
                min={this.state.minYear}
                max={this.state.maxYear}
                allowCross={false}
                value={this.state.years}
                onChange={(e) => this.updateYear(e)}/>
            <LineChart
                snpdata={subset}
                capdata={capped} />
    	</div>);
    }
}

export { Main };