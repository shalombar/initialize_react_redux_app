import React, { Component } from 'react';
import logo from './logo.svg';
import './css/style.css';

import Header from './components/Header/Header';
import MyStore from './components/myStore/MyStore';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <MyStore/>
      </div>
    );
  }
}

export default (App);

