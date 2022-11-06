import React, { Component } from 'react';
import { Button, Input } from 'reactstrap';
import { MdArrowRightAlt } from 'react-icons/md';

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
    savingsCont: {
      borderRadius: "5px",
      border: 'solid 2px #f2f2f2',
      padding: "10px",
      margin: '20px -10px 0 -10px',
    },
    savingsRow: {
      marginTop: "5px",
      marginBottom: "5px",
    },
    button: {
      borderRadius: "25px",
      backgroundColor: "#3495eb",
      padding: '10px 20px 10px 20px',
    },
    savings: {
      color: '#47d170',
      fontFamily: 'Arial',
      fontSize: '50px',
      fontWeight: "700",
      lineHeight: "72px",
      margin: '0 0 24px',
      textAlign: 'center'
    }
  }

  dollar = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
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

    let loading = this.state.loading
      ? <p><em>Loading...</em></p>
      : ''

    let savings = this.state.savingsObject == null
      ? <p></p>
      : <div>
        <div className="savingsCont" style={this.styles.savingsCont}>
          <div className="savingsRow" style={this.styles.savingsRow}>
            <div><b>Savings per Month</b></div>
          </div>
          <div className="savingsRow" style={this.styles.savingsRow}>
            <span style={this.styles.savings}>{this.dollar.format(this.state.savingsObject.MonthlyRepaymentDifference)}</span>
          </div>
          <div className="savingsRow" style={this.styles.savingsRow}>
            <div><b>Total Savings</b></div>
          </div>
          <div className="savingsRow" style={this.styles.savingsRow}>
            <span style={this.styles.savings}>{this.dollar.format(this.state.savingsObject.TotalSaved)}</span>
          </div>
        </div>
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
          <Button className="button" style={this.styles.button} onClick={() => this.getSavings()}>
            Submit <MdArrowRightAlt />
          </Button>
        </div>
        {loading}
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
