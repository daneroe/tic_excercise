
import React, { Component } from 'react';
import Alert from 'reactstrap/lib/Alert';

class Warning extends Component {

    styles = {
        row: {
            margin: "20px 0 0 -10px",
            width: "90%",
        }
    }

    render() {
        return (
            <div className="row" style={this.styles.row}>
                <Alert color="warning">
                    Please enter valid values
                </Alert>
            </div>
        );
    }
}

export default Warning;