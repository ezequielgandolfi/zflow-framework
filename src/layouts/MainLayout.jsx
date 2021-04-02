import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import MenuBar from "../components/MenuBar/MenuBar";
import RouterLayout from "./RouterLayout";

class MainLayout extends Component {
  state = {};
  render() {
    return (
      <BrowserRouter>
        <div>
          <MenuBar />
          <RouterLayout />
        </div>
      </BrowserRouter>
    );
  }
}

export default MainLayout;
