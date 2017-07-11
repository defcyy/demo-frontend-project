import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Client from './Client'

class App extends Component {

  state = {
    data: ""
  };

  componentDidMount() {
    Client.request( data => {
      console.log(data)
      this.setState({
        data: data
      })
    })
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-intro">
          <h2>Data from backend</h2>
          <p>{this.data}</p>
        </div>
      </div>
    );
  }
}

export default App;
