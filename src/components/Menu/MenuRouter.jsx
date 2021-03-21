import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import FlowDiagram from "../FlowDiagram/FlowDiagram";
import Users from "../Users/Users";

class MenuRouter extends Component {
  render() {
    return (
      <section>
        <main role="main">
          <div>
            <Switch>
              <Route path="/about">
                <p>About</p>
              </Route>
              <Route path="/users">
                <Users instanceController={this.props.instanceController} />
              </Route>
              <Route path="/diagram">
                <FlowDiagram instanceController={this.props.instanceController} />
              </Route>
              <Route path="/">
                <Dashboard instanceController={this.props.instanceController} />
              </Route>
              
            </Switch>
          </div>
        </main>
      </section>
    );
  }
}

export default MenuRouter;
