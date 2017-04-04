import React from 'react';
var LineChart = require("react-chartjs").Line;

class BusinessLineChart extends React.Component {
    render(){
        return <LineChart data={this.props.data} width="600" height="250"/>
    }
}
export default BusinessLineChart;