import React, { Component } from "react";

class EnginePipelinePage extends Component {
  state = { message: 'Unknown' };

  setData(message) {
    this.setState({ message });
  }

  // test
  test() {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => this.setData(data.message));
  }

  componentDidMount() {
    this.test();
  }

  render() {
    return (
      <section>
        <h5>Engine Pipeline</h5>
        <h6>Here we'll configure the engine pipelines with their lifecycle</h6>
        <h7>Fetch API: {this.state.message}</h7>
      </section>
    );
  }
}

export default EnginePipelinePage;
