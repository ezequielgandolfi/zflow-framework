import React, { Component } from "react";
import ReactFlow, { removeElements, addEdge } from "react-flow-renderer";
import { v4 as uuidv4 } from 'uuid';

import "./diagram.css";
import DiagramNodeProperties from "./DiagramNodeProperties";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateElements, setContextElement, setSelectedElement } from '../../actions/diagramActions';
import { FlowComponents } from "../../helpers/component";
import { GRID_SIZE, NODE_HANDLE_TYPE } from "../../helpers/diagram/const";
import DiagramComponentPanel from "./DiagramComponentPanel";
import { STYLE_FLOW_END, STYLE_FLOW_ERROR, STYLE_FLOW_FALSE, STYLE_FLOW_REPEAT, STYLE_FLOW_TRUE } from "./diagramStyle";
import { Button } from "react-bootstrap";
import DiagramComponentSelection from "./DiagramComponentSelection";

/**
 * Main diagram component.
 * Currently is only for test purposes. It needs to be "componentized" for the final project
 */

class Diagram extends Component {
  state = { elements: [], addComponent: { show: false } };

  contextComponent;
  contextPos = { x: 0, y: 0 };

  componentDidMount() {
    // this.refreshComponentList();
    // NEW / LOAD ???
    this.props.updateElements(this.initialElements());
  }

  initialElements() {
    const start = this.createComponent('start.default', GRID_SIZE * 2, GRID_SIZE * 2);
    start.data.id = 'start';
    return [ start ];
  }

  clearSelectedElement() {
    if (this.props.selectedElement) {
      const element = this.props.elements.find(item => item.id === this.props.selectedElement);
      if (element) {
        delete element.data.$selected;
      }
      this.props.setSelectedElement(null);
    }
  }

  setSelectedElement(component) {
    this.clearSelectedElement();
    if (component) {
      const element = this.props.elements.find(item => item.id === component.id);
      if (element) {
        element.data.$selected = true;
      }
      this.props.setSelectedElement(component.id);
    }
    else {
      this.props.setSelectedElement(null);
    }
  }

  createComponent(key,left,top) {
    const result = {
      id: uuidv4(),
      type: key,
      data: { id: '' },
      position: { x: left, y: top },
    };
    result.position.x = (Math.round(result.position.x / GRID_SIZE) * GRID_SIZE);
    result.position.y = (Math.round(result.position.y / GRID_SIZE) * GRID_SIZE);

    const component = FlowComponents.components[key];
    if (component) {
      result.data.label = component.shortDescription;
      result.data.properties = FlowComponents.getComponentPropertiesDefaultValues(key);
    }

    return result;
  }

  insertComponent(componentType,event) {
    this.hideContextMenus();
    const component = this.createComponent(componentType, this.contextPos.x, this.contextPos.y);
    this.props.updateElements([...this.props.elements,component]);
    this.setSelectedElement(component);
  }

  onAddComponent(event) {
    this.hideContextMenus();
    this.setState({ addComponent: { show: true } });
  }

  handleAddComponentSave(key) {
    this.setState({ addComponent: { show: false } });
    this.insertComponent(key);
  }

  handleAddComponentCancel() {
    this.setState({ addComponent: { show: false } });
  }

  onNodeContextMenu(event, node) {
    event.preventDefault();
    this.hideContextMenus();
    this.contextComponent = node;
    const container = document.getElementById('diagramContainer').getBoundingClientRect();
    this.showNodeContextMenu(event.clientX - container.left, event.clientY - container.top);
  };

  onNodeDoubleClick(event, node) {
    this.hideContextMenus();
    this.contextComponent = node;
    if (this.contextComponent) {
      this.props.setContextElement(this.contextComponent.id);
    }
  }

  onPaneClick(event) {
    this.hideContextMenus();
    this.setSelectedElement(null);
  }

  onPaneContextMenu(event) {
    event.preventDefault();
    this.hideContextMenus();
    const container = document.getElementById('diagramContainer').getBoundingClientRect();
    this.contextPos.x = event.clientX - container.left;
    this.contextPos.y = event.clientY - container.top;
    this.showPanelContextMenu(event.clientX - container.left, event.clientY - container.top);
  }

  showNodeContextMenu(left,top) {
    const contextMenu = document.getElementById('nodeContextMenu');
    contextMenu.style.left = `${left}px`;
    contextMenu.style.top = `${top}px`;
    contextMenu.style.display = 'block';
  }

  showPanelContextMenu(left,top) {
    const contextMenu = document.getElementById('panelContextMenu');
    contextMenu.style.left = `${left}px`;
    contextMenu.style.top = `${top}px`;
    contextMenu.style.display = 'block';
  }

  hideContextMenus() {
    this.contextComponent = null;
    const nodeContextMenu = document.getElementById('nodeContextMenu');
    nodeContextMenu.style.display = null;
    const panelContextMenu = document.getElementById('panelContextMenu');
    panelContextMenu.style.display = null;
  }

  removeElements(elementsToRemove) {
    const elements = removeElements(elementsToRemove, this.props.elements);
    this.props.updateElements(elements);
  }
    
  onConnect(params) { 
    params = this.labelHandle(params);
    let elements = this.props.elements;
    elements = this.disconnectHandlers(elements, params);
    elements = addEdge(params, elements);
    this.props.updateElements(elements);
  }

  disconnectHandlers(elements, params) {
    if (params.targetHandle !== NODE_HANDLE_TYPE.input.multiple) {
      const remove = this.props.elements.filter(item => item.target === params.target);
      elements = removeElements(remove, elements);
    }
    return elements;
  }

  labelHandle(params) {
    params.animated = true;
    params.type = "smoothstep";
    switch(params.sourceHandle) {
      case NODE_HANDLE_TYPE.output.error:
        params = {...params, ...STYLE_FLOW_ERROR};
        break;
      case NODE_HANDLE_TYPE.output.true:
        params = {...params, ...STYLE_FLOW_TRUE};
        break;
      case NODE_HANDLE_TYPE.output.false:
        params = {...params, ...STYLE_FLOW_FALSE};
        break;
      case NODE_HANDLE_TYPE.output.repeat:
        params = {...params, ...STYLE_FLOW_REPEAT};
        break;
      case NODE_HANDLE_TYPE.output.end:
        params = {...params, ...STYLE_FLOW_END};
        break;
      default:
        break;
    }
    return params;
  }

  onElementClick(event, element) { 
    this.hideContextMenus();
    this.setSelectedElement(element);
  }

  onSelectionChange(elements) {
    if (!elements) {
      this.clearSelectedElement();
    }
  }

  onNodeProperties(event) {
    const component = this.contextComponent;
    this.hideContextMenus();
    if (component) {
      this.props.setContextElement(component.id);
    }
  }

  onNodeClearOutputs(event) {
    const component = this.contextComponent;
    this.hideContextMenus();
    if (component) {
      const remove = this.props.elements.filter(item => item.source === component.id);
      let elements = this.props.elements;
      elements = removeElements(remove, elements);
      this.props.updateElements(elements);
    }
  }

  onSaveProperties(values) {
    const elements = this.props.elements;
    if (this.props.contextElement) {
      const el = elements.find(item => item.id === this.props.contextElement);
      el.data.properties = { ...values };
    }
    this.props.setContextElement(null);
  }

  onCancelProperties() {
    this.props.setContextElement(null);
  }

  onNodeDelete(event) {
    const component = this.contextComponent;
    this.hideContextMenus();
    if (component) {
      if (component.type !== 'start') {
        this.removeElements([component]);
        this.clearSelectedElement();
      }
    }
  }

  test() {
    fetch("/api/test", { method: "POST", body: JSON.stringify(this.props.elements) })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch(() => this.setData('ERROR feching /api/test'));
  }

  render() {
    return (
      <section className="diagram">
        <div className="diagram-container" id="diagramContainer">
          <ReactFlow
            elements={this.props.elements}
            nodeTypes={FlowComponents.nodes()}
            zoomOnScroll={false}
            zoomOnPinch={false}
            panOnScroll={true}
            zoomOnDoubleClick={false}
            snapToGrid={true}
            snapGrid={[GRID_SIZE,GRID_SIZE]}
            onConnect={this.onConnect.bind(this)}
            selectNodesOnDrag={true}
            onElementClick={this.onElementClick.bind(this)}
            onSelectionChange={this.onSelectionChange.bind(this)}
            onNodeContextMenu={this.onNodeContextMenu.bind(this)}
            onNodeDoubleClick={this.onNodeDoubleClick.bind(this)}
            onPaneClick={this.onPaneClick.bind(this)}
            onPaneContextMenu={this.onPaneContextMenu.bind(this)}
          >
          </ReactFlow>
        </div>
        <DiagramNodeProperties onSave={this.onSaveProperties.bind(this)} onCancel={this.onCancelProperties.bind(this)} />
        <DiagramComponentPanel />
        <DiagramComponentSelection show={this.state.addComponent.show} onSave={this.handleAddComponentSave.bind(this)} onCancel={this.handleAddComponentCancel.bind(this)} />
        <div className="dropdown">
          <ul className="dropdown-menu" id="nodeContextMenu">
            <li><h6 className="dropdown-header">Selected component</h6></li>
            <li className="dropdown-item" onClick={this.onNodeProperties.bind(this)}>Properties</li>
            <li className="dropdown-item" onClick={this.onNodeClearOutputs.bind(this)}>Clear outputs</li>
            <li className="dropdown-item diagram-node-action-delete" onClick={this.onNodeDelete.bind(this)}>Delete</li>
          </ul>
        </div>
        <div className="dropdown">
          <ul className="dropdown-menu" id="panelContextMenu" role="menu">
            <li><h6 className="dropdown-header">Add</h6></li>
            <li className="dropdown-item" onClick={this.onAddComponent.bind(this)}>Component</li>
          </ul>
        </div>
        <div className="diagram-action-panel">
          <Button onClick={this.test.bind(this)}>
            Save (TEST)
          </Button>
        </div>
      </section>
    );
  }
}

const mapStateToProps = store => ({
  elements: store.diagramState.elements,
  selectedElement: store.diagramState.selectedElement,
  contextElement: store.diagramState.contextElement
});

const mapDispatchToProps = dispatch => bindActionCreators({ 
  updateElements, setSelectedElement, setContextElement 
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (Diagram);
