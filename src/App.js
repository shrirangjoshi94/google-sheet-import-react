import React, { Component } from 'react';
import Tabletop from 'tabletop';
import { Table } from 'reactstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    Tabletop.init({
      key: '1Gu_BOKVF4SG8CR32gCV2syhFrQeHibDRbE6M4f4J5dY',
      callback: googleData => {
        this.setState({
          data: googleData
        });
      },
      simpleSheet: true
    });
  }

  calculateTotal = (quantity, price) => {
    let total = 0;
    for (let i = 0; i < this.state.data.length; i++) {
      total += parseInt(this.state.data[i][quantity] * this.state.data[i][price]);
    }

    return total;
  };

  render() {
    return (
      <>
        {
          this.state.data.length ? (<Table striped bordered hover>
            <thead>
              <tr>
                <th>Company</th>
                <th>Quantity</th>
                <th>Buying Price</th>
                <th>Net Gain/Loss</th>
              </tr>
            </thead>
            <tbody>
              <>
                {
                  this.state.data.map((data, index) => {

                    return (
                      <tr key={index}>
                        <td key={index}>{data['Company Name']}</td>
                        <td>{data['Quantity']}</td>
                        <td>{data['Buying Price']}</td>
                        <td>{data['Quantity'] * Math.abs(data['Current Price'] - data['Buying Price'])} {data['Current Price'] > data['Buying Price'] ? 'Profit' : 'Loss'}</td>
                      </tr>
                    )
                  })
                }
                {
                  <tr>
                    <td><b>Total Amount Invested</b></td>
                    <td>{this.calculateTotal('Quantity', 'Buying Price')}</td>
                  </tr>
                }
              </>
            </tbody>
          </Table>) : "Loading"
        }
      </>
    );
  }
}

export default App;