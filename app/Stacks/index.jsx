import React from 'react';
import Stack from './singleton.jsx';
class Stacks extends React.Component {
    render() {
        return (
            <div>
                {this.props.sets.map((set, index) => {
                    return <Stack
                        offset={this.props.offset}
                        root={this.props.root}
                        data={set}
                        key={index} />
                })}
            </div>
        );
    }
}
export default Stacks;