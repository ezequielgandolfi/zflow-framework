import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class MenuBar extends Component {

  render() {
    
    return (
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="navbar-brand" href="#">
          ZFlow
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            {this.props.menus.map((menu,index) => this.renderMenuLink(menu,index))}
          </ul>
        </div>
      </nav>
    );
  }

  renderMenuLink(menu,index) {
    let menuClassItems = ['nav-link'];
    if (menu.active) {
      menuClassItems.push('active');
    }
    if (!menu.enabled) {
      menuClassItems.push('disabled');
    }
    const menuClass = menuClassItems.join(' ');
    return (
      <li className="nav-item" key={index}>
        <Link className={menuClass} to={menu.link}>{menu.name}</Link>
      </li>
    )
  }
}

const mapStateToProps = store => ({
  menus: store.menuState.menus
});

export default connect(mapStateToProps) (MenuBar);
