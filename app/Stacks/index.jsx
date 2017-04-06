import React from 'react';
import Stack from './singleton.jsx';
class Stacks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstOnly: true,
            lastOnly: true
        };
    }
    toggleFirstOnly(dir) {
        this.setState({
            firstOnly: !this.state.firstOnly
        });
    }
    toggleLastOnly(dir) {
        this.setState({
            lastOnly: !this.state.lastOnly
        });
    }
    render() {
        return (
            <div>
                <label className="form-group">
                    Fix Investment Date
                <input
                    type="checkbox"
                    checked={this.state.firstOnly}
                    onChange={(e) => this.toggleFirstOnly()} />
                </label>
                <label className="form-group">
                    Fix Withdrawal Date
                <input
                    type="checkbox"
                    checked={this.state.lastOnly}
                    onChange={(e) => this.toggleLastOnly()} />
                </label>
                {this.props.sets.map((set, index) => {
                    return <Stack
                        firstOnly={this.state.firstOnly}
                        lastOnly={this.state.lastOnly}
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