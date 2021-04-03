import React, { Component } from "react";
import ReactFlow, { removeElements, addEdge } from "react-flow-renderer";
import { v4 as uuidv4 } from 'uuid';

import "./diagram.css";
import NodeProperties from "./NodeProperties";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateElements, setSelectedElement } from '../../actions/diagramActions';
import { ZFlowComponents } from "../../helpers/component";
import { NODE_HANDLE_TYPE } from "../../helpers/diagram/const";
import DiagramComponentPanel from "./DiagramComponentPanel";

class Diagram extends Component {
  //#region Styles
  flowEndStyle = {
    label: "End",
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: 'lightblue', color: '#fff', fillOpacity: 0.7 },
  };
  flowTrueStyle = {
    label: "True",
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: 'lightgreen', color: '#fff', fillOpacity: 0.7 },
  };
  flowFalseStyle = {
    label: "False",
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: 'salmon', color: '#fff', fillOpacity: 0.7 },
  };
  flowRepeatStyle = {
    label: "Repeat",
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: 'lightgreen', color: '#fff', fillOpacity: 0.7 },
  };
  flowErrorStyle = {
    label: "Error",
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: 'red', color: '#fff', fillOpacity: 0.7 },
  };
  //#endregion

  state = { elements: [], selection: { show: false, properties: [], data: {} } };

  selectedComponent;
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

  clearSelectedComponent() {
    if (this.props.selectedElement) {
      this.props.setSelectedElement(null);
    }
  }

  setSelectedComponent(component) {
    this.clearSelectedComponent();
    // this.selectedComponent = component;
    this.props.setSelectedElement(component.id);
    // this.refresh();
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
    // this.refresh([...this.props.elements,component]);
    this.props.updateElements([...this.props.elements,component]);
    this.setSelectedComponent(component);
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
    // this.refresh(elements);
  }
    
  onConnect(params) { 
    params = this.labelHandle(params);
    let elements = this.props.elements;
    elements = this.disconnectHandlers(elements, params);
    elements = addEdge(params, elements);
    // this.refresh(elements);
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
        params = {...params, ...this.flowErrorStyle};
        break;
      case NODE_HANDLE_TYPE.output.true:
        params = {...params, ...this.flowTrueStyle};
        break;
      case NODE_HANDLE_TYPE.output.false:
        params = {...params, ...this.flowFalseStyle};
        break;
      case NODE_HANDLE_TYPE.output.repeat:
        params = {...params, ...this.flowRepeatStyle};
        break;
      case NODE_HANDLE_TYPE.output.end:
        params = {...params, ...this.flowEndStyle};
        break;
      default:
        break;
    }
    return params;
  }

  onElementClick(event, element) { 
    this.hideContextMenus();
    this.setSelectedComponent(element);
  }

  onSelectionChange(elements) {
    if (!elements) {
      this.clearSelectedComponent();
    }
  }

  refresh(elements,selection) {
    elements = elements || this.props.elements;
    this.props.updateElements(elements);
    this.setState({ elements: elements, selection: selection || this.state.selection });
  }

  onNodeProperties(event) {
    const component = this.contextComponent;
    this.hideContextMenus();
    if (component) {
      const componentType = ZFlowComponents.getComponentType(component.type, component.data.component);
      const selection = { show: true, component, properties: componentType.properties, data: component.data.properties };
      this.refresh(null,selection);
    }
  }

  onSaveProperties(values) {
    const elements = this.props.elements;
    if (this.state.selection?.component) {
      const el = elements.find(item => item.id === this.state.selection.component.id);
      el.data.properties = { ...values };
    }
    const selection = { show: false, properties: [], data: { }, component: null };
    this.refresh(elements,selection);
  }

  onCancelProperties() {
    const selection = { show: false, properties: [], data: { } };
    this.refresh(null,selection);
  }

  onNodeDelete(event) {
    const component = this.contextComponent;
    this.hideContextMenus();
    if (component) {
      if (component.type !== 'start') {
        this.removeElements([component]);
        this.clearSelectedComponent();
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
        <NodeProperties show={this.state.selection.show} properties={this.state.selection.properties} data={this.state.selection.data} onSave={this.onSaveProperties.bind(this)} onCancel={this.onCancelProperties.bind(this)} />
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
  selectedElement: store.diagramState.selectedElement
});

const mapDispatchToProps = dispatch => bindActionCreators({ 
  updateElements, setSelectedElement 
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (Diagram);
