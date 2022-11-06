import React, { Component } from 'react';
import { Button, Input, InputGroup, InputGroupText, Alert } from 'reactstrap';
import { MdArrowRightAlt } from 'react-icons/md';
import Spinner from 'reactstrap/lib/Spinner';

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = {
      customerRate: 4.29,
      borrowAmount: 600000,
      savingsObject: null,
      loading: false,
      valid: true
    };
  }

  API_URL = 'https://localhost:5001';

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
    savingsCont: {
      borderRadius: "5px",
      margin: '20px 20px 0 -10px',
    },
    savingsRow: {
      margin: "5px 0 5px 0",
    },
    button: {
      borderRadius: "25px",
      backgroundColor: "#0075FF",
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

  // Currency Formatter
  dollar = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });

  // Handlers
  handleRateChange = (event) => {
    this.setState({
      customerRate: event.target.value,
      valid: this.checkValidState(event.target.value)
    });
  }

  handleAmountChange = (event) =>
    this.setState({
      borrowAmount: event.target.value,
      valid: this.checkValidState(event.target.value)
    });

  // State validator 
  checkValidState = (value) =>
    this.state.customerRate >= 1 && this.state.borrowAmount >= 1 && value >= 1 ? true : false;

  // Sections - Keeping these all in single component for sake of simplicity and time constraints.
  cardSubComponent = (loading, savings, valid) => {
    return (
      <div className="cont" style={this.styles.card}>
        <div className="row" stype={this.styles.row}>
          <div><b>Current Rate</b></div>
        </div>
        <div className="row" style={this.styles.row}>
          <input style={{ width: "100% " }} id='volume' type='range' min="2.00" max="20.00" step="0.01" value={this.state.customerRate}
            onChange={this.handleRateChange}>
          </input>
        </div>
        <div className="row" style={this.styles.row}>
          <InputGroup>
            <Input type="number" id='rate' value={this.state.customerRate} onChange={this.handleRateChange}></Input>
            <InputGroupText>%</InputGroupText>
          </InputGroup>
        </div>
        <div className="row" stype={this.styles.row}>
          <div><b>Borrowing Amount</b></div>
        </div>
        <div className="row" style={this.styles.row}>
          <input style={{ width: "100% " }} id='volume' type='range' min="100000" max="1000000" step="500" value={this.state.borrowAmount}
            onChange={this.handleAmountChange}>
          </input>
        </div>
        <div className="row" style={this.styles.row}>
          <InputGroup>
            <InputGroupText>
              $
            </InputGroupText>
            <Input id='amount' type='number'
              value={this.state.borrowAmount}
              onChange={this.handleAmountChange} >
            </Input>
          </InputGroup>
        </div>
        <div className="row" style={this.styles.row}>
          <Button disabled={!this.state.valid} className="button" style={this.styles.button} onClick={() => this.getSavings()} >
            Submit <MdArrowRightAlt />
          </Button>
        </div>
        {loading}
        {savings}
        {valid}
      </div>
    );
  }

  savingsSubComponent = () => {
    return (
      <div>
        <div className="savingsCont" style={this.styles.savingsCont}>
          <div className="savingsRow" style={this.styles.savingsRow}>
            <div><b>Savings per Month</b></div>
          </div>
          <div className="savingsRow" style={this.styles.savingsRow}>
            <span style={this.styles.savings}>
              {this.dollar.format(Math.abs(this.state.savingsObject.MonthlyRepaymentDifference))}
            </span>
          </div>
          <div className="savingsRow" style={this.styles.savingsRow}>
            <div><b>Total Savings</b></div>
          </div>
          <div className="savingsRow" style={this.styles.savingsRow}>
            <span style={this.styles.savings}>
              {this.dollar.format(Math.abs(this.state.savingsObject.TotalSaved))}
            </span>
          </div>
        </div>
      </div>
    )
  }

  loadingSubComponent = () => {
    return (
      <div className="row" stype={this.styles.row}>
        <Spinner color="info" type="grow" />
      </div>
    );
  }

  warningSubComponent = () => {
    return (
      <div className="row" stype={this.styles.row}>
        <Alert color="warning">
          Invalid values.
        </Alert>
      </div>
    );
  }

  render() {
    let loading = this.state.loading ? this.loadingSubComponent() : '';
    let valid = this.state.valid ? '' : this.warningSubComponent();
    let savings = this.state.savingsObject == null || this.state.loading ? <p></p> : this.savingsSubComponent();
    return (this.cardSubComponent(loading, savings, valid));
  }

  async getSavings() {
    const rate = this.state.customerRate / 100;
    const amount = this.state.borrowAmount;
    this.setState({ loading: true });
    const response = await fetch(`${this.API_URL}/SavingsCalculator?CustomerRate=${rate}&BorrowingAmount=${amount}`);
    const data = await response.json();
    this.setState({ savingsObject: JSON.parse(data.content), loading: false });
  }
}
