import React from 'react';
import Slider, { Range } from 'rc-slider';
import { helpers } from '../helpers/index.jsx';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const TooltipRange = createSliderWithTooltip(Slider.Range);

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            years: [2000, 2008],
            cap: 5
        };
    }
    componentWillMount() {
        helpers.getStocks().then(function (data) {
            const min = new Date('1997-01-01');
            return helpers.filterStocks(data, min);
        }).then(function (subset) {
            // console.log(subset);
        });
    }
    updateYear(e) {
        this.setState({
            years: e
        });
    }
    updateCap(cap) {
        this.setState({
            cap: cap
        });
    }
    render() {
    	return (
    	<div>
            <Slider
                min={1}
                max={20}
                value={this.state.cap}
                onChange={(e) => this.updateCap(e)}/>
    		<TooltipRange
                min={1996}
                max={2016}
                pushable={true}
                allowCross={false}
                value={this.state.years}
                onChange={(e) => this.updateYear(e)}/>
    	</div>);
    }
}

export { Main };