import React, { Component } from "react";
import ReactFlow, { removeElements, addEdge } from "react-flow-renderer";
import { v4 as uuidv4 } from 'uuid';

import "./diagram.css";
import DiagramNodeProperties from "./DiagramNodeProperties";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateElements, setContextElement, setSelectedElement } from '../../actions/diagramActions';
import { ZFlowComponents } from "../../helpers/component";
import { NODE_HANDLE_TYPE } from "../../helpers/diagram/const";
import DiagramComponentPanel from "./DiagramComponentPanel";
import { STYLE_FLOW_END, STYLE_FLOW_ERROR, STYLE_FLOW_FALSE, STYLE_FLOW_REPEAT, STYLE_FLOW_TRUE } from "./diagramStyle";

class Diagram extends Component {
  state = { elements: [] };

  contextComponent;
  contextPos = { x: 0, y: 0};

  componentDidMount() {
    this.refreshComponentList();
    // NEW / LOAD ???
    this.props.updateElements(this.initialElements());
  }

  initialElements() {
    const start = this.createComponent('start', 40, 40);
    start.data.id = 'start';
    ZFlowComponents.updateComponentType(start);
    return [ start ];
  }

  refreshComponentList() {
    const panel = document.getElementById('panelContextMenu');
    panel.querySelectorAll('li.dropdown-item').forEach(item => item.remove());
    
    Object.keys(ZFlowComponents.components).forEach(key => { 
      const component = ZFlowComponents.components[key];
      if (!component.hideComponent) {
        const eLi = document.createElement('li');
        eLi.classList.add('dropdown-item');
        eLi.onclick = (event) => { this.insertComponent(key, event) };
        eLi.innerText = component.description;
        panel.appendChild(eLi);
      }
    });
  }

  clearSelectedElement() {
    if (this.props.selectedElement) {
      this.props.setSelectedElement(null);
    }
  }

  setSelectedElement(component) {
    this.clearSelectedElement();
    this.props.setSelectedElement(component.id);
  }

  createComponent(componentType,left,top) {
    const result = {
      id: uuidv4(),
      type: componentType,
      data: { id: '' },
      position: { x: left, y: top },
    };
    result.position.x = (Math.round(result.position.x / 5) * 5);
    result.position.y = (Math.round(result.position.y / 5) * 5);

    const component = ZFlowComponents.getComponent(componentType);
    const defaultComponent = component.components.length > 0 ? component.components[0] : null;
    if (defaultComponent) {
      result.data.component = defaultComponent.key;
      result.data.properties = ZFlowComponents.getComponentTypePropertyDefaults(componentType, defaultComponent.key);
    }

    return result;
  }

  insertComponent(componentType,event) {
    this.hideContextMenus();
    const component = this.createComponent(componentType, this.contextPos.x, this.contextPos.y);
    ZFlowComponents.updateComponentType(component);
    this.props.updateElements([...this.props.elements,component]);
    this.setSelectedElement(component);
  }

  onNodeContextMenu(event, node) {
    event.preventDefault();
    this.hideContextMenus();
    this.contextComponent = node;
    const container = document.getElementById('diagramContainer').getBoundingClientRect();
    this.showNodeContextMenu(event.clientX - container.left, event.clientY - container.top);
  };

  onPaneClick(event) {
    this.hideContextMenus();
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

  render() {
    return (
      <section className="diagram">
        <div className="diagram-container" id="diagramContainer">
          <ReactFlow
            elements={this.props.elements}
            nodeTypes={ZFlowComponents.nodes()}
            zoomOnScroll={false}
            zoomOnPinch={false}
            panOnScroll={true}
            zoomOnDoubleClick={false}
            snapToGrid={true}
            snapGrid={[5,5]}
            onConnect={this.onConnect.bind(this)}
            selectNodesOnDrag={true}
            onElementClick={this.onElementClick.bind(this)}
            onSelectionChange={this.onSelectionChange.bind(this)}
            onNodeContextMenu={this.onNodeContextMenu.bind(this)}
            onPaneClick={this.onPaneClick.bind(this)}
            onPaneContextMenu={this.onPaneContextMenu.bind(this)}
          >
          </ReactFlow>
        </div>
        <DiagramNodeProperties onSave={this.onSaveProperties.bind(this)} onCancel={this.onCancelProperties.bind(this)} />
        <DiagramComponentPanel />
        <div className="dropdown">
          <ul className="dropdown-menu" id="nodeContextMenu">
            <li><h6 className="dropdown-header">Selected component</h6></li>
            <li className="dropdown-item" onClick={this.onNodeProperties.bind(this)}>Properties</li>
            <li className="dropdown-item diagram-node-action-delete" onClick={this.onNodeDelete.bind(this)}>Delete</li>
          </ul>
        </div>
        <div className="dropdown">
          <ul className="dropdown-menu" id="panelContextMenu" role="menu">
            <li><h6 className="dropdown-header">Add component</h6></li>
          </ul>
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
