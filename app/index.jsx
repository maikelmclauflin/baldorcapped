import React from 'react';
import ReactDOM from 'react-dom';
import { helpers } from './helpers/index.jsx';
import { Main } from './Main/index.jsx';
import 'rc-slider/assets/index.css';
import './styles/index.css';
import '../node_modules/react-table/react-table.css';
const app = document.getElementById('app');

const style = React.createElement('style', {
    rel: 'stylesheet',
    type: 'text/css'
}, helpers.TWENTY.reduce(function (memo, index, idx, list) {
    return memo + '.stacked-row.length-' + index + ':after{width:' + ((index/(list.length-1)) * 100) + '%}';
}, helpers.TWENTY.reduce(function (memo, offset, index, offsets) {
    return memo + '.stacked-row.offset-' + offset + '{ margin-left: ' + ((offset / (offsets.length - 1)) * 100) + '% }';
}, '')));

ReactDOM.render(<div className="content-wrapper">
    {style}
    <Main/>
</div>, app);