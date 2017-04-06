import React from 'react';
import { helpers } from '../helpers/index.jsx';

class Row extends React.Component {
    render() {
        return (
            <div className={[
                'stacked-row',
                'length-' + this.props.length,
                'offset-' + this.props.offset,
                this.props.positive ? 'positive' : 'negative'].join(' ')}></div>
            );
    }
}
class Stack extends React.Component {
    render() {
        const blocks = [];
        const data = this.props.data;
        const root = this.props.root;
        const offset = this.props.offset;
        const lastOnly = this.props.lastOnly;
        const firstOnly = this.props.firstOnly;
        data.forEach((first, i1, data) => {
            const root_first = root[i1];
            if (firstOnly && i1) {
                return;
            }
            data.slice(i1 + 1).forEach((last, i2, list) => {
                const length = i2 + 1;
                const root_last = root[i1 + 1 + i2];
                const root_delta = root_last.y - root_first.y;
                if (lastOnly && last !== list[list.length - 1]) {
                    return;
                }
                blocks.push({
                    length: length,
                    gains: last.y - first.y - root_delta,
                    offset: offset + i1
                });
            });
        });
        return (
            <div className="stack-container">
            {blocks.map((block, index) => {
                return <Row
                    length={block.length}
                    offset={block.offset}
                    positive={block.gains >= 0}
                    key={index} />
            })}
            </div>
        );
    }
}
export default Stack;