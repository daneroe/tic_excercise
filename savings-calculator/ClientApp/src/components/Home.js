import React, { Component } from 'react';
import { Row, Button, Input } from 'reactstrap';

export class Home extends Component {
  static displayName = Home.name;

  styles = {
    card: {
      fontFamily: 'Helvetica',
      width: '50%',
      margin: 'auto',
      padding: '30px',
      backgroundColor: 'white',
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column"
    },
    row: {
      marginTop: "10px",
      marginBottom: "10px",
    },
    button: {
      
    }
  };

  dollar = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  constructor(props) {
    super(props);
    this.state = {
      customerRate: 4.29,
      borrowAmount: 600000,
      savingsObject: null,
      loading: false
    };
  }

  handleRateChange = (event) => this.setState({ customerRate: event.target.value })
  handleAmountChange = (event) => this.setState({ borrowAmount: event.target.value })

  render() {

    let load = this.state.loading
      ? <p><em>Loading...</em></p>
      : <p><em>Done...</em></p>;

    let savings = this.state.savingsObject == null
      ? <p></p>
      : <div>
          <div className="row" style={this.styles.row}>
          <h2>Savings per month</h2>
          </div>
          <p>{this.dollar.format(this.state.savingsObject.MonthlyRepaymentDifference)}</p>
          <div className="row" style={this.styles.row}>
          <h2>Total Savings</h2>
          </div>          
          <p>{this.dollar.format(this.state.savingsObject.TotalSaved)}</p>
        </div>;

    return (
      <div className="cont" style={this.styles.card}>
        <div className="row" stype={this.styles.row}>
          <div><b>Current Rate</b></div>
        </div>
        <div className="row" style={this.styles.row}>
          <input id='volume' type='range' min="2.00" max="20.00" step="0.1" value={this.state.customerRate}
            onChange={this.handleRateChange}>
          </input>
        </div>
        <div className="row" style={this.styles.row}>
          <Input id='rate' type='number'
            value={this.state.customerRate}
            onChange={this.handleRateChange} >
          </Input>
        </div>
        <div className="row" stype={this.styles.row}>
        <div><b>Borrowing Amount</b></div>
        </div>
        <div className="row" style={this.styles.row}>
          <input id='volume' type='range' min="100000" max="1000000" step="500" value={this.state.borrowAmount}
            onChange={this.handleAmountChange}>
          </input>
        </div>
        <div className="row" style={this.styles.row}>
          <Input id='amount' type='number'
            value={this.state.borrowAmount}
            onChange={this.handleAmountChange} >
          </Input>
        </div>
        <div className="row" style={this.styles.row}>
          <Button onClick={() => this.getSavings()}>
            Submit
          </Button>
        </div>
        {savings}
      </div>
    )
  }

  async getSavings() {
    const rate = this.state.customerRate / 100;
    const amount = this.state.borrowAmount;
    this.setState({ loading: true })
    const response = await fetch(`https://localhost:5001/SavingsCalculator?CustomerRate=${rate}&BorrowingAmount=${amount}`);
    const data = await response.json();
    this.setState({ savingsObject: JSON.parse(data.content), loading: false });
  }
}
