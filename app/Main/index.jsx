// should the state persist on page reloads
// should the lines be curved
// who is this being created for / what is the user's needs
// are 1 year blocks / intervals ok
import React from 'react';
import Slider, { Range } from 'rc-slider';
import { helpers } from '../helpers/index.jsx';
import LineChart from '../LineChart/index.jsx';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const TooltipSlider = createSliderWithTooltip(Slider);
const TooltipRange = createSliderWithTooltip(Range);

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
        const snpData = this.subsetData(data);
        const cap = this.state.cap / 100;
        const capData = helpers.generateCappedPoints(snpData, cap);
    	return (
    	<div
            className="fluid-container">
            <h1>Bald or Capped</h1>
            <div
                className="container">
                <LineChart
                    snpdata={snpData}
                    capdata={capData} />
                <TooltipSlider
                    className="cap-slider"
                    min={1}
                    max={20}
                    value={this.state.cap}
                    vertical={true}
                    onChange={(e) => this.updateCap(e)}/>
                <TooltipRange
                    className="year-range"
                    min={this.state.minYear}
                    max={this.state.maxYear}
                    allowCross={false}
                    value={this.state.years}
                    onChange={(e) => this.updateYear(e)}/>
            </div>
            <div
                className="container">
            </div>
    	</div>);
    }
}

export { Main };