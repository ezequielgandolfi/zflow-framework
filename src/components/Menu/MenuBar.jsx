import React, { Component } from "react";
import {
    Link
} from "react-router-dom";

class MenuBar extends Component {

  constructor(props) {
    super(props);
    this.setState({ menus: this.props.instanceController.menus });
    this.props.instanceController.menuEvent.addEventListener('refresh', () => { this.updateMenus() });
  }

  updateMenus() {
    this.setState({ menus: this.props.instanceController.menus });
  }

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
            {this.props.instanceController.menus.map((menu,index) => this.renderMenuLink(menu,index))}
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
      <li className="nav-item active" key={index}>
        <Link className={menuClass} to={menu.link}>{menu.name}</Link>
      </li>
    )
  }
}

export default MenuBar;
