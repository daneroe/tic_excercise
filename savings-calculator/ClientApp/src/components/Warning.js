
import React, { Component } from 'react';
import Alert from 'reactstrap/lib/Alert';

class Warning extends Component {

    styles = {
        row: {
            margin: "10px 0 10 0",
            width: "100%",
        }
    }

    render() {
        return (
            <div className="row" stype={this.styles.row}>
                <Alert color="warning">
                    Invalid values.
                </Alert>
            </div>
        );
    }
}

export default Warning;