import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import * as actions from './actions/general.act';

class App extends Component {
  render() {
    return (
      <div className="App">
        <span>{this.props.general.test}</span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps, actions)(App);

