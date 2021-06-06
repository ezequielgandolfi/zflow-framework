import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

class RouterLayout extends Component {

  _renderRoute(menu,index) {
    return (
      <Route key={index} path={menu.link} exact={true} component={menu.component} />
    )
  }

  render() {
    return (
      <section className="router-layout">
        <main role="main">
          <Switch>
            {this.props.menus.map((item,index) => this._renderRoute(item,index))}
          </Switch>
        </main>
      </section>
    );
  }
}

const mapStateToProps = store => ({
  menus: store.menuState.menus
});

export default connect(mapStateToProps) (RouterLayout);
