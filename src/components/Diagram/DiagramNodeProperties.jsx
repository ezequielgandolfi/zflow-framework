import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

class DiagramNodeProperties extends Component {
  state = { modalShow: false, properties: [], data: {} };

  _handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const data = this.state.data;
    data[name] = value;
    this.setState({ data });
  }

  _handleCancel() {
    if (this.props.onCancel instanceof Function) {
      this.props.onCancel();
    }
    this.setState({ modalShow: false });
  }

  _handleSave() {
    if (this.props.onSave instanceof Function) {
      this.props.onSave(this.state.data);
    }
    this.setState({ modalShow: false });
  }

  _renderProperty(property, index) {
    console.log(property.key, property.description, property.readOnly);
    return (
      <div className="row" key={index}>
        <div className="input-group mb-3 col-sm">
          <span className="input-group-text">{property.description}</span>
          <input
            type="text"
            name={property.key}
            className="form-control"
            value={this.state.data[property.key]}
            onChange={this._handleChange.bind(this)}
          />
          <button className="btn btn-outline-secondary" type="button">Value</button>
        </div>
      </div>
    );
  }

  _rederPropertyList() {
    const list = this.state.properties.filter(item => !item.readOnly);
    if (list.length > 0) {
      return list.map((item, index) => this._renderProperty(item, index));
    }
    else {
      return <div className="text-center">No input properties</div>;
    }
  }

  _renderCancelButton() {
    return (
      <Button variant="secondary" onClick={this._handleCancel.bind(this)}>
        Cancel
      </Button>
    );
  }

  _renderSaveButton() {
    if (this.state.properties.filter(item => !item.readOnly).length > 0) {
      return (
        <Button variant="primary" onClick={this._handleSave.bind(this)}>
          Save
        </Button>
      );
    }
  }

  _renderActionButtons() {
    return (
      <>
        {this._renderCancelButton()}
        {this._renderSaveButton()}
      </>
    );
  }

  _renderModalTitle() {
    // TODO - add the component type to the title
    let title = 'Input properties';
    return (
      <Modal.Title>{title}</Modal.Title>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.show !== prevState.modalShow) {
      this.setState({ modalShow: this.props.show, properties: this.props.properties, data: Object.assign({},this.props.data) });
    }
  }

  render() {
    return (
      <section className="diagram-node-properties">
        <Modal show={this.state.modalShow} onHide={this._handleCancel.bind(this)} size="lg">
          <Modal.Header>
            {this._renderModalTitle()}
          </Modal.Header>
          <Modal.Body>
            {this._rederPropertyList()}
          </Modal.Body>
          <Modal.Footer>
            {this._renderActionButtons()}
          </Modal.Footer>
        </Modal>
      </section>
    );
  }
}

export default DiagramNodeProperties;
