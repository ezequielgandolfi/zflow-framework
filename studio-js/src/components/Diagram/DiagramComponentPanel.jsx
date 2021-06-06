import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateElements, setSelectedElement } from "../../actions/diagramActions";
import { objectOrNull } from '../../helpers/object';

class DiagramComponentPanel extends Component {
  state = { element: null }

  _handleIdChange(event) {
    const value = event.target.value;
    const element = this.state.element;
    element.data.id = value;
    this.setState({ element });
    this.props.updateElements([...this.props.elements]);
  }

  _renderInputID() {
    if (this.state.element) {
      return (
        <div className="form-label-group">
          <input type="input" className="form-control" id="panel-input-id" placeholder="Optional" value={this.state.element.data.id} onChange={this._handleIdChange.bind(this)} />
          <label htmlFor="panel-input-id">ID (optional)</label>
        </div>
      );
    }
  }

  componentDidUpdate() {
    if (objectOrNull(this.state.element?.id) !== objectOrNull(this.props.selectedElement)) {
      if (this.props.selectedElement) {
        const element = this.props.elements.find(item => item.id === this.props.selectedElement);
        if (element) {
          this.setState({ element });
        }
      }
      else {
        this.setState({ element: null });
      }
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
            <div className="col-md-2">
              {this._renderInputID()}
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
