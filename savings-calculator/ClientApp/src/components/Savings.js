
import React, { Component } from 'react';

class Savings extends Component {

    // Currency Formatter
    dollar = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
    });

    styles = {
        savingsCont: {
            borderRadius: "5px",
            margin: '20px 20px 0 -10px',
        },
        savingsRow: {
            margin: "5px 0 5px 0",
        },
        savingsSpan: {
            color: '#47d170',
            fontFamily: 'Arial',
            fontSize: '50px',
            fontWeight: "700",
            lineHeight: "72px",
            margin: '0 0 24px',
            textAlign: 'center'
        }
    }

    render() {
        return (
            <div>
                <div className="savingsCont" style={this.styles.savingsCont}>
                    <div className="savingsRow" style={this.styles.savingsRow}>
                        <div><b>Monthly Savings</b></div>
                    </div>
                    <div className="savingsRow" style={this.styles.savingsRow}>
                        <span style={this.styles.savingsSpan}>
                            {this.dollar.format(Math.abs(this.props.monthlySavings))}
                        </span>
                    </div>
                    <div className="savingsRow" style={this.styles.savingsRow}>
                        <div><b>Total Savings</b></div>
                    </div>
                    <div className="savingsRow" style={this.styles.savingsRow}>
                        <span style={this.styles.savingsSpan}>
                            {this.dollar.format(Math.abs(this.props.totalSavings))}
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Savings;