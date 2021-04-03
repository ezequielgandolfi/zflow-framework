import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ZFlowComponents } from '../../helpers/component';
import { updateElements, setSelectedElement } from "../../actions/diagramActions";

class DiagramComponentPanel extends Component {
  state = { element: null }

  componentDidUpdate() {
    if (this.state.element?.id != this.props.selectedElement) {
      if (this.props.selectedElement) {
        const element = this.props.elements.find(item => item.id === this.props.selectedElement);
        if (element) {
          console.log(element);
          this.setState({ element });
        }
      }
      else {
        this.setState({ element: null });
      }
    }
  } 

  onComponentTypeChange(event) {
    const value = event.target.value;
    const element = this.state.element;
    element.data.component = value;
    ZFlowComponents.updateComponentType(element);
    this.setState({ element });
    this.props.updateElements([...this.props.elements]);
  }

  onComponentIdChange(event) {
    const value = event.target.value;
    const element = this.state.element;
    element.data.id = value;
    this.setState({ element });
    this.props.updateElements([...this.props.elements]);
  }

  renderSelectOptions() {
    const optionElement = (value,text) => {
      return <option key={value} value={value}>{text}</option>
    };
    const component = this.state.element ? ZFlowComponents.getComponent(this.state.element.type) : null;
    return component?.components.map(subcomponent => optionElement(subcomponent.key,subcomponent.description));
  }

  renderInputComponentType() {
    if (this.state.element) {
      return (
        <div className="form-label-group">
          <select className="form-select w-100" id="panel-input-type" value={this.state.element.data.component} onChange={this.onComponentTypeChange.bind(this)}>
            {this.renderSelectOptions()}
          </select>
          <label htmlFor="panel-input-type">Component type</label>
        </div>
      );
    }
  }

  renderInputID() {
    if (this.state.element) {
      return (
        <div className="form-label-group">
          <input type="input" className="form-control" id="panel-input-id" placeholder="Optional" value={this.state.element.data.id} onChange={this.onComponentIdChange.bind(this)} />
          <label htmlFor="panel-input-id">ID (optional)</label>
        </div>
      );
    }
  }

  render() { 
    const mainClass = ['diagram-panel', 'py-3', 'bg-light'];
    if (!this.state.element) {
      mainClass.push('invisible');
    }

    return ( 
      <section className="diagram-component-panel">
        <footer className={mainClass.join(' ')}>
          <div className="row px-3">
            <div className="col-md-4">
              {this.renderInputComponentType()}
            </div>
            <div className="col-md-2">
              {this.renderInputID()}
            </div>
          </div>
        </footer>
      </section>
    );
  }
}
 
const mapStateToProps = store => ({
  elements: store.diagramState.elements,
  selectedElement: store.diagramState.selectedElement
});

const mapDispatchToProps = dispatch => bindActionCreators({ 
  updateElements, setSelectedElement 
}, dispatch);

export default connect(mapStateToProps,mapDispatchToProps) (DiagramComponentPanel);
