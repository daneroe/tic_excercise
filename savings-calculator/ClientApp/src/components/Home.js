import React, { Component } from 'react';
import { Row } from 'reactstrap';

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = { 
      customerRate: 0.468,
      borrowAmount: 6000000,
      savingsObject: null, 
      loading: false };
  }

  handleRateChange = (event) => this.setState({ customerRate : event.target.value })
  handleAmountChange = (event) => this.setState({ borrowAmount : event.target.value })

  render() {

    let load = this.state.loading
    ? <p><em>Loading...</em></p>
    : <p><em>Done...</em></p>;

    let savings = this.state.savingsObject == null
    ? <p><em>Loading...</em></p>
    : <p><em>Done...</em></p>;

    return (
      <div>
        {load}
        <Row>
          <h3>Current Rate</h3>
          <input id='rate' type='number' value={this.state.customerRate} onChange= {this.handleRateChange} ></input>
        </Row>
        <Row>
          <h3>Borrowing Amount</h3>
          <input id='amount' type='number' value={this.state.borrowAmount} onChange={this.handleAmountChange} ></input>
        </Row>
        <Row> 
          <button onClick={() => this.getSavings() }>Submit</button>
        </Row>
        {savings}
      </div>
    )



    // return (
    //   <div>
    //     <h1 id="tabelLabel" >Weather forecast</h1>
    //     <p>This component demonstrates fetching data from the server.</p>
    //     {contents}
    //   </div>
    // );
  }

  async getSavings() {
    const rate = this.state.customerRate;
    const amount = this.state.borrowAmount;
    this.setState({ loading: true })    
    const response = await fetch(`https://localhost:5001/SavingsCalculator?CustomerRate=${rate}&BorrowingAmount=${amount}`);
    const data = await response.json();
    console.log("Returning", JSON.parse(data.content))
    this.setState({ savingsObject: JSON.parse(data.content), loading: false });
  }
}
