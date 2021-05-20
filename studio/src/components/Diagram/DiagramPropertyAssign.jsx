import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { ZFlowComponents } from "../../helpers/component";

const VALUE_TYPE_FIXED = 'F';
const VALUE_TYPE_OBJECT = 'O';

const VALUE_OBJECT_PREFIX = '$(';
const VALUE_OBJECT_SUFIX = ')';
const VALUE_OBJECT_PROP_SPLIT = '.';

class DiagramPropertyAssign extends Component {
  state = { property: null, valueType: null, componentId: '', componentProp: '', fixedValue: '' }

  static value2state(value) {
    const state = { valueType: VALUE_TYPE_FIXED, fixedValue: '', componentId: '', componentProp: '' };
    state.fixedValue = value || '';
    if (value.startsWith(VALUE_OBJECT_PREFIX) && value.endsWith(VALUE_OBJECT_SUFIX)) {
      const valueFrom = value.substring(VALUE_OBJECT_PREFIX.length, value.length - VALUE_OBJECT_PREFIX.length + 1);
      const valueSplit = valueFrom.split(VALUE_OBJECT_PROP_SPLIT);
      if (valueSplit.length === 2) {
        state.valueType = VALUE_TYPE_OBJECT;
        state.fixedValue = '';
        state.componentId = valueSplit[0];
        state.componentProp = valueSplit[1];
      }
    }
    return state;
  }

  static state2value(state) {
    if (state.valueType === VALUE_TYPE_FIXED) {
      return state.fixedValue;
    }
    else {
      return `${VALUE_OBJECT_PREFIX}${state.componentId}${VALUE_OBJECT_PROP_SPLIT}${state.componentProp}${VALUE_OBJECT_SUFIX}`;
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
      { id: '', data: { id: '' } },
      ...this.props.elements.filter(item => !!item.data?.id)
    ];
    return components.map(item => _optionElement(item.data.id,item.data.id));
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
      const compType = ZFlowComponents.getComponentType(component.type, component.data.component);
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
