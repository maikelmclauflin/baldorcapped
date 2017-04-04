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
            const min = new Date('1997-01-01');
            return helpers.filterStocks(data, min);
        }).then((subset) => {
            this.setState({
                data: subset
            });
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
    render() {
        console.log(this.state.data);
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
                redraw
                data={{
                    type: 'line',
                    datasets: this.state.data
                }} />
    	</div>);
    }
}

export { Main };