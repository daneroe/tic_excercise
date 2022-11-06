
import Spinner from "reactstrap/lib/Spinner";
import React, { Component } from 'react';

class Loading extends Component {

    styles = {
        row: {
            margin: "10px 0 10 0",
            width: "100%",
        }
    }

    render() {
        return <div className="row" stype={this.styles.row}>
            <Spinner color="info" type="grow" />
        </div>
    }
}

export default Loading;