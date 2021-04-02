import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setActiveMenu } from "../actions/menuActions";

class DashboardPage extends Component {
  render() {
    this.props.setActiveMenu('/');
    return <p>Dashboard</p>;
  }
}

const mapStateToProps = store => ({
  menus: store.menuState.menus
});

const mapDispatchToProps = dispatch => bindActionCreators({ 
  setActiveMenu 
}, dispatch);

export default connect(mapStateToProps,mapDispatchToProps) (DashboardPage);
