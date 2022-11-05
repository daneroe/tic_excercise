import React, { Component } from 'react';
import { Container } from 'reactstrap';

export class Layout extends Component {
  static displayName = Layout.name;

  styles = {
    cont: {
      width: '100%',
      margin: 'auto',
      height: "100vh",
      paddingTop: "20px",
      backgroundColor: '#f2f2f2'
    }
  };

  render() {
    return (
      <div className='cont' style={this.styles.cont}>
        {this.props.children}
      </div>
    );
  }
}
