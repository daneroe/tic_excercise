import React, { Component } from 'react';
import { Button, Input } from 'reactstrap';
import { MdArrowRightAlt } from 'react-icons/md';
import Loading from './Loading'
import Warning from './Warning';
import Savings from './Savings';
import InputMask from 'react-input-mask';

export class Home extends Component {

  state = {
    customerRate: 4.29,
    borrowAmount: 600000,
    savingsObject: null,
    loading: false,
    valid: true
  };

  API_URL = 'https://localhost:5001';
  PERC_MASK = '9.99%';

  dollar = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });

  styles = {
    card: {
      fontFamily: 'Helvetica',
      width: '20%',
      margin: 'auto',
      padding: '30px 0 10px 30px',
      backgroundColor: 'white',
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      boxShadow: '5px 5px #ebeced'
    },
    row: {
      marginTop: "10px",
      marginBottom: "10px",
      width: "100%",
    },
    button: {
      borderRadius: "25px",
      backgroundColor: "#0075FF",
      padding: '10px 20px 10px 20px',
    }
  }

  // Handlers
  handleRateChange = (event) => {
    const empty = (event.target.value == "_.__%");
    const value = empty ? parseFloat(0.00).toFixed(2) : parseFloat(this.symbolStripper(event.target.value)).toFixed(2)
    this.setState({
      customerRate: value,
      valid: this.checkValidState(value)
    });
  }

  handleAmountChange = (event) => {
    const empty = (event.target.value == "" || event.target.value == "$");
    const value = empty ? parseInt(0) : parseInt(this.symbolStripper(event.target.value));
    this.setState({
      borrowAmount: value,
      valid: this.checkValidState(value)
    });
  }

  // Validators
  symbolStripper = (value) =>
    value.replace("_", "")
      .replace("%", '')
      .replace(",", "")
      .replace("$", "");

  checkValidState = (value) => {
    console.log(this.state.customerRate, this.state.borrowAmount, value)
    return this.state.customerRate >= 1 && this.state.borrowAmount >= 1 && value >= 1 ? true : false;
  }

  // Main component
  card = (loading, savings, warning) => {
    return (
      <div className="cont" style={this.styles.card}>
        <div className="row" stype={this.styles.row}>
          <div><b>Current Rate</b></div>
        </div>
        <div className="row" style={this.styles.row}>
          <input style={{ width: "100% " }} id='volume' type='range' min="2.00" max="9.99" step="0.01"
            value={this.state.customerRate}
            onChange={this.handleRateChange}>
          </input>
        </div>
        <div className="row" style={this.styles.row}>
          <Input type="string" id='rate'
            mask={this.PERC_MASK}
            value={this.state.customerRate}
            tag={InputMask}
            onChange={this.handleRateChange}></Input>
        </div>
        <div className="row" stype={this.styles.row}>
          <div><b>Borrowing Amount</b></div>
        </div>
        <div className="row" style={this.styles.row}>
          <input style={{ width: "100% " }} id='volume' type='range' min="100000" max="1000000" step="500"
            value={this.state.borrowAmount}
            onChange={this.handleAmountChange}>
          </input>
        </div>
        <div className="row" style={this.styles.row}>
          <Input id='amount' type='string'
            value={this.dollar.format(this.state.borrowAmount)}
            onChange={this.handleAmountChange} >
          </Input>
        </div>
        <div className="row" style={this.styles.row}>
          <Button disabled={!this.state.valid} className="button" style={this.styles.button}
            onClick={() => this.getSavings()} >
            Submit <MdArrowRightAlt />
          </Button>
        </div>
        {warning}
        {loading}
        {savings}
      </div>
    );
  }

  render() {
    // Conditional renders
    let loading = this.state.loading ? <Loading></Loading> : '';
    let valid = !this.state.valid ? <Warning></Warning> : '';
    let savings = (this.state.savingsObject == null || this.state.loading)
      ? <p></p>
      : <Savings
        monthlySavings={this.state.savingsObject.MonthlyRepaymentDifference}
        totalSavings={this.state.savingsObject.TotalSaved}>
      </Savings>;

    return (this.card(loading, savings, valid));
  }

  async getSavings() {
    const rate = this.state.customerRate / 100;
    const amount = this.state.borrowAmount;

    this.setState({ loading: true });

    const response = await fetch(`${this.API_URL}/SavingsCalculator?CustomerRate=${rate}&BorrowingAmount=${amount}`);
    const data = await response.json();

    this.setState({
      savingsObject: JSON.parse(data.content),
      loading: false
    });
  }

}
