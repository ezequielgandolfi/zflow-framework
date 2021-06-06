import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { FlowComponents } from "../../helpers/component";
import { Util } from "@zflow/components";

const VALUE_TYPE_FIXED = 'F';
const VALUE_TYPE_OBJECT = 'O';

class DiagramPropertyAssign extends Component {
  state = { property: null, valueType: null, componentId: '', componentProp: '', fixedValue: '' }
  
  static value2state(value) {
    const property = Util.value2property(value);
    const state = { valueType: VALUE_TYPE_FIXED, fixedValue: '', componentId: '', componentProp: '' };
    if (property.component) {
      state.valueType = VALUE_TYPE_OBJECT;
      state.componentId = property.component.id;
      state.componentProp = property.component.property;
    }
    else {
      state.fixedValue = property.fixed || '';
    }
    return state;
  }

  static state2value(state) {
    if (state.valueType === VALUE_TYPE_FIXED) {
      return Util.property2value({ fixed: state.fixedValue }) ;
    }
    else {
      return Util.property2value({ component: { id: state.componentId, property: state.componentProp } });
    }
  }

  _handleComponentChange(event) {
    this.setState({ componentId: event.target.value, componentProp: '' });
  }

  _handleComponentPropChange(event) {
    this.setState({ componentProp: event.target.value });
  }

  _handleFixedValueChange(event) {
    this.setState({ fixedValue: event.target.value });
  }

  _handleValueTypeChange(event) {
    let state = { valueType: event.target.value };
    if (state.valueType !== this.state.valueType) {
      state.fixedValue = '';
      state.componentId = '';
      state.componentProp = '';
      this.setState(state);
    }
  }

  _handleCancel() {
    if (this.props.onCancel instanceof Function) {
      this.props.onCancel();
    }
  }

  _handleSave() {
    if (this.props.onSave instanceof Function) {
      this.props.onSave(DiagramPropertyAssign.state2value(this.state));
    }
  }

  _renderValueTypeList() {
    const _optionElement = (value,text) => {
      return <option key={value} value={value}>{text}</option>
    };
    const _values = [
      { value: VALUE_TYPE_FIXED, name: 'Fixed value' },
      { value: VALUE_TYPE_OBJECT, name: 'From a component' }
    ];
    if (this.props.data) {
      return (
        <div className="col-12 py-1">
          <div className="form-label-group">
            <select className="form-select w-100" id="node-prop-component" value={this.state.valueType} onChange={this._handleValueTypeChange.bind(this)}>
              {_values.map(item => _optionElement(item.value, item.name))}
            </select>
            <label htmlFor="node-prop-component">Value type</label>
          </div>
        </div>
      );
    }
  }

  _renderFixedValue() {
    if (this.props.data && (this.state.valueType === VALUE_TYPE_FIXED)) {
      return (
        <div className="col-12 py-1">
          <div className="form-label-group">
            <input type="input" className="form-control" id="node-prop-fixed" value={this.state.fixedValue} onChange={this._handleFixedValueChange.bind(this)} />
            <label htmlFor="node-prop-fixed">Value</label>
          </div>
        </div>
      );
    }
  }

  _renderComponentSelectOptions() {
    const _optionElement = (value,text) => {
      return <option key={value} value={value}>{text}</option>
    };
    const components = [
      { key: '', text: '' },
      ...this.props.elements.filter(item => !!item.data?.id).map(item => { 
        const component = FlowComponents.getComponent(item.type);
        return { key: item.data.id, text: `${item.data.id} (${component.description})` }
      })
    ];
    return components.map(item => _optionElement(item.key, item.text));
  }

  _renderComponentList() {
    if (this.props.data && this.props.elements && (this.state.valueType === VALUE_TYPE_OBJECT)) {
      return (
        <div className="col-12 py-1">
          <div className="form-label-group">
            <select className="form-select w-100" id="node-prop-component" value={this.state.componentId} onChange={this._handleComponentChange.bind(this)}>
              {this._renderComponentSelectOptions()}
            </select>
            <label htmlFor="node-prop-component">Component</label>
          </div>
        </div>
      );
    }
  }

  _renderPropertySelectOptions() {
    const _optionElement = (value,text) => {
      return <option key={value} value={value}>{text}</option>
    };
    const component = this.props.elements.find(item => item.data?.id === this.state.componentId);
    if (component) {
      const compType = FlowComponents.getComponent(component.type);
      if (compType) {
        const properties = [
          { key: '', description: '' },
          ...compType.properties
        ];
        return properties.map(item => _optionElement(item.key,item.description));
      }
    }
  }

  _renderPropertyList() {
    if (this.state.componentId && (this.state.valueType === VALUE_TYPE_OBJECT)) {
      return (
        <div className="col-12 py-1">
          <div className="form-label-group">
            <select className="form-select w-100" id="node-prop-component-prop" value={this.state.componentProp} onChange={this._handleComponentPropChange.bind(this)}>
              {this._renderPropertySelectOptions()}
            </select>
            <label htmlFor="node-prop-component-prop">Property</label>
          </div>
        </div>
      );
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
    return (
      <Button variant="primary" onClick={this._handleSave.bind(this)}>
        Save
      </Button>
    );
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
    let title = 'Set value';
    if (this.props.data?.property) {
      title += ` - ${this.props.data.property.description}`;
    }
    return (
      <Modal.Title>{title}</Modal.Title>
    )
  }

  static getDerivedStateFromProps(props, state) {
    if (props.data) {
      // new property
      if (!state.property) {
        state.property = props.data.property;
        state.valueType = VALUE_TYPE_FIXED;
        Object.assign(state, DiagramPropertyAssign.value2state(props.data.value));
      }
    }
    else {
      state.property = null;
    }
    return state;
  }

  render() {
    let show = !!(this.props.data);

    return (
      <section className="diagram-property-assign">
        <Modal show={show} onHide={this._handleCancel.bind(this)}>
          <Modal.Header>
            {this._renderModalTitle()}
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              {this._renderValueTypeList()}
              {this._renderFixedValue()}
              {this._renderComponentList()}
              {this._renderPropertyList()}
            </div>
          </Modal.Body>
          <Modal.Footer>
            {this._renderActionButtons()}
          </Modal.Footer>
        </Modal>
      </section>
    );
  }
}

const mapStateToProps = store => ({
  elements: store.diagramState.elements
});

export default connect(mapStateToProps) (DiagramPropertyAssign);
