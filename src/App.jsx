import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import MenuBar from './components/Menu/MenuBar';
import MenuRouter from './components/Menu/MenuRouter';
import InstanceController from './components/InstanceController';

class App extends Component {

  constructor() {
    super();
    this.instanceController = new InstanceController()
  }

  render() {
    return (
      <Router>
        <div>
          <MenuBar instanceController={this.instanceController} />
          <MenuRouter instanceController={this.instanceController} />
        </div>
      </Router>
    );
  }
}

export default App;
