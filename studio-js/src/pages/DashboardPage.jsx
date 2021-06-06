import React, { Component } from "react";
import { connect } from "react-redux";

class DashboardPage extends Component {
  render() {
    return (
      <section>
        <h5>Dashboard</h5>
        <h6>Alarms, Graphics, History...</h6>
        <h7>Soon...</h7>
      </section>
    );
  }
}

const mapStateToProps = store => ({
  menus: store.menuState.menus
});

export default connect(mapStateToProps) (DashboardPage);
