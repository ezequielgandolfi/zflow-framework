import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { FlowComponents } from "../../helpers/component";

class DiagramComponentSelection extends Component {
  state = { selected: null, groups: [] };

  static getDerivedStateFromProps(props, state) {
    if ((!state.groups) || (state.groups.length === 0)) {
      state.groups = [];
      Object.keys(FlowComponents.components).forEach(key => {
        const keySplit = key.split(".");
        const groupKey = keySplit[0];
        let groupItem = state.groups.find(item => item.id === groupKey);
        if (!groupItem) {
          groupItem = {
            id: groupKey,
            label: DiagramComponentSelection.groupLabel(groupKey),
            components: []
          };
          state.groups.push(groupItem);
        }
        groupItem.components.push(key);
      });
    }
    return state;
  }

  static groupLabel(name) {
    return name
      .split('-')
      .map(word => {
        return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
      })
      .join(' ');
  }

  _handleCancel() {
    if (this.props.onCancel instanceof Function) {
      this.props.onCancel();
    }
  }

  _handleSelect(key) {
    if (this.props.onSave instanceof Function) {
      this.props.onSave(key);
    }
  }

  _renderCancelButton() {
    return (
      <Button variant="secondary" onClick={this._handleCancel.bind(this)}>
        Cancel
      </Button>
    );
  }

  _renderActionButtons() {
    return (
      <>
        {this._renderCancelButton()}
      </>
    );
  }

  _renderComponent(component) {
    return (
      <button key={component.type} type="button" className="btn btn-outline-dark" onClick={() => this._handleSelect(component.key)}>{component.description}</button>
    );
  }

  _renderComponentGroup(id) {
    const group = this.state.groups.find(item => item.id === id);
    if (group) {
      const componentList = group.components
        .map(key => FlowComponents.components[key])
        .sort((a,b) => { return a.description.localeCompare(b.description) });
      const componentRender = componentList
        .filter(component => !component.hidden)
        .map(component => this._renderComponent(component));
      if (componentRender.length > 0)  {
        return (
          <div className="card bg-light mb-3" key={id}>
            <div className="card-header">{group.label}</div>
            <div className="card-body">
              <div className="btn-group" role="group">
                {componentRender}
              </div>
            </div>
          </div>
        );
      }
    }
  }

  _renderComponentGroups() {
    return this.state.groups
      .sort((a,b) => { return a.label.localeCompare(b.label) })
      .map(group => this._renderComponentGroup(group.id));
  }

  render() {
    let show = !!(this.props.show);

    return (
      <section className="diagram-component-selection">
        <Modal show={show} size="xl" scrollable onHide={this._handleCancel.bind(this)}>
          <Modal.Header>
            <Modal.Title>Add component</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row row-cols-1 m-1">
              {this._renderComponentGroups()}
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

export default connect(mapStateToProps) (DiagramComponentSelection);
