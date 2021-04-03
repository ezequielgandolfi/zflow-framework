import React, { Component } from "react";
import { connect } from "react-redux";

class DashboardPage extends Component {
  render() {
    return <p>Dashboard</p>;
  }
}

const mapStateToProps = store => ({
  menus: store.menuState.menus
});

export default connect(mapStateToProps) (DashboardPage);
