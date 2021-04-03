import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Diagram from "../components/Diagram/Diagram";
import DashboardPage from "../pages/DashboardPage";

class RouterLayout extends Component {

  // renderMenu(menu,index) {
  //   const RouteComponent = menu.component;
  //   return (
  //     <Route key={index} path={menu.link}>
  //       <p>{menu.link}</p>
  //       <RouteComponent />
  //     </Route>
  //   )
  // }

  render() {
    return (
      <section className="router-layout">
        <main role="main">
          <div>
            <Switch>
              {/* {this.props.menus.map((item,index) => this.renderMenu(item,index))} */}
              <Route path="/diagram" component={Diagram} />
              <Route path="/" component={DashboardPage} />
            </Switch>
          </div>
        </main>
      </section>
    );
  }
}

const mapStateToProps = store => ({
  menus: store.menuState.menus
});

export default connect(mapStateToProps) (RouterLayout);
