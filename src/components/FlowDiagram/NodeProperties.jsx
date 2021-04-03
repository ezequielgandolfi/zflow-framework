import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

class NodeProperties extends Component {
  state = { modalShow: false, properties: [], data: {} };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.show !== prevState.modalShow) {
      this.setState({ modalShow: this.props.show, properties: this.props.properties, data: Object.assign({},this.props.data) });
    }
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const data = this.state.data;
    data[name] = value;
    this.setState({ data });
  }

  renderProperty(property, index) {
    return (
      <div className="row" key={index}>
        <div className="input-group mb-3 col-sm">
          <span className="input-group-text">{property.description}</span>
          <input
            type="text"
            name={property.key}
            className="form-control"
            value={this.state.data[property.key]}
            onChange={this.handleChange.bind(this)}
          />
          <button className="btn btn-outline-secondary" type="button">Value</button>
        </div>
      </div>
    );
  }

  handleClose(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.props.onCancel instanceof Function) {
      this.props.onCancel();
    }
    this.setState({ modalShow: false });
  }

  handleSave(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.props.onSave instanceof Function) {
      this.props.onSave(this.state.data);
    }
    this.setState({ modalShow: false });
  }

  render() {
    return (
      <section className="node-properties">
        <Modal show={this.state.modalShow} onHide={this.handleClose.bind(this)} size="lg">
          <Modal.Header>
            <Modal.Title>Properties</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.properties.filter(item => !!item.readOnly).map((item, index) => this.renderProperty(item, index))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose.bind(this)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.handleSave.bind(this)}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
    );
  }
}

export default NodeProperties;
