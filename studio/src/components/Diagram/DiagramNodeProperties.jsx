import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateElements, setContextElement } from "../../actions/diagramActions";
import { ZFlowComponents } from "../../helpers/component";
import { objectOrNull } from "../../helpers/object";
import DiagramPropertyAssign from "./DiagramPropertyAssign";

class DiagramNodeProperties extends Component {
  state = { element: null, properties: [], data: { }, valueWizardData: null }

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
    this.setState({ element: null });
  }

  _handleSave() {
    if (this.props.onSave instanceof Function) {
      // change component alias in property values to GUID
      // TODO
      //
      this.props.onSave(this.state.data);
    }
    this.setState({ element: null });
  }

  _handleValueWizardClick(property) {
    this.setState({valueWizardData: { property, value: this.state.data[property.key] }});
  }

  _handleValueWizardSave(value) {
    const data = this.state.data;
    if (this.state.valueWizardData) {
      data[this.state.valueWizardData.property.key] = value;
    }
    this.setState({data, valueWizardData: null});
  }

  _handleValueWizardCancel() {
    this.setState({valueWizardData: null});
  }

  _renderProperty(property, index) {
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
          <button className="btn btn-outline-secondary" type="button" onClick={this._handleValueWizardClick.bind(this, property)}>&lt;&lt; Value</button>
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
    let title = 'Input properties';
    if (this.state.element) {
      const componentType = ZFlowComponents.getComponent(this.state.element.type, this.state.element.data.component);
      title += ` - ${componentType.shortDescription}`;
    }
    return (
      <Modal.Title>{title}</Modal.Title>
    )
  }

  componentDidUpdate() {
    if (objectOrNull(this.state.element?.id) !== objectOrNull(this.props.contextElement)) {
      if (this.props.contextElement) {
        const element = this.props.elements.find(item => item.id === this.props.contextElement);
        if (element) {
          const componentType = ZFlowComponents.getComponent(element.type, element.data.component);
          const properties = componentType.properties;
          const data = Object.assign({},element.data.properties);
          // change GUID for component alias in property values
          // TODO
          //
          this.setState({ element, properties, data });
        }
      }
      else {
        this.setState({ element: null });
      }
    }
  }

  render() {
    const show = !!(this.state.element) && !(this.state.valueWizardData);

    return (
      <section className="diagram-node-properties">
        <Modal show={show} onHide={this._handleCancel.bind(this)} size="lg">
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
        <DiagramPropertyAssign data={this.state.valueWizardData} onSave={this._handleValueWizardSave.bind(this)} onCancel={this._handleValueWizardCancel.bind(this)} />
      </section>
    );
  }
}

const mapStateToProps = store => ({
  elements: store.diagramState.elements,
  contextElement: store.diagramState.contextElement
});

const mapDispatchToProps = dispatch => bindActionCreators({ 
  updateElements, setContextElement 
}, dispatch);

export default connect(mapStateToProps,mapDispatchToProps) (DiagramNodeProperties);
