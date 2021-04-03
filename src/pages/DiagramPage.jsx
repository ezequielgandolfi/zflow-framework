import React, { Component } from "react";
import Diagram from "../components/Diagram/Diagram";

class DiagramPage extends Component {
  state = { };

  render() {
    return (
      <section className="diagram-page">
        <Diagram />
      </section>
    );
  }
}

export default DiagramPage;
