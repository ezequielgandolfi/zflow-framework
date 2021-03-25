import React, { Component } from "react";
import ReactFlow, { removeElements, addEdge } from "react-flow-renderer";
import { CustomComponents, NODE_HANDLE_TYPE } from "./CustomNodes";
import { v4 as uuidv4 } from 'uuid';

import "./FlowDiagram.css";

/*
Configuracao do diagrama

- StopCondition: 
  - StopOnError (Aborta o processo quando ocorrer um erro nao tratado pela saida de erro do componente)
  - IgnoreErrors (Continua restante dos processos paralelos, sem abortar o processamento - Nao marca fluxo como erro, apenas se entrar no componente de Stop) 
  
Configuracao de componentes

#Geral
  - É possivel atribuir IDs para cada componente. Isso é necessário para resgatar valores de saída do componente, qdo utilizado.
  - Todo processo aberto é registrado em banco, e ao final é gravado o status que o mesmo terminou. Desta forma é possivel criar alertas para processos que falham, etc. Isso tambem vai poder ser visto no dashboard


- Alert
  # registra alerta na tabela de alertas do sistema
  - ID (ID do alerta previamente criado)

- Condition
  # testa uma condicao, resultado verdadeira ativa porta de sucesso, falso ativa porta de erro
  - Type
    - Expect all (espera que todas entradas sejam satisfatorias)
    - Expect onde (espera que ao menos uma entrada seja satisfatoria)
    - Script (executa script)
  - Entries (exceto para Type = Script)
    - LeftValue
    - Operator (==, !=, >, <, >=, <=)
    - RightValue

- Join
  # aguarda todas entradas finalizarem antes de continuar
  - ContinueAfter (condicoes para continuar, depois de receber a primeira entrada)
    - Immediatly (ja continua na primeira entrada)
    - All entries (continua somente depois de receber todas entradas)
    - Timed (se nao receber todas entradas, continua depois de um tempo determinado)
  - StopAfter (condicoes para abortar o processo, depois de receber a primeira entrada)
    - Never (nunca gera condicao de erro)
    - Timed (se nao receber todas entradas, gera erro depois de um tempo determinado)

- Function

- Math

- Merge

- Pause

- Process

- Repeat

- Transform

- Start

- Stop

- Storage


*/

class FlowDiagram extends Component {
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

  selectedElement;
  contextElement;
  contextPos = { x: 0, y: 0};

  initialElements = [
    this.createComponent('start', 40, 40)
  ];

  state = { elements: this.initialElements };

  onLoad() {
    this.refreshComponentList();
    this.updateComponentPanel();
  }

  refreshComponentList() {
    const panel = document.getElementById('panelContextMenu');
    panel.querySelectorAll('li.dropdown-item').forEach(item => item.remove());
    
    Object.keys(CustomComponents.components).forEach(key => { 
      const component = CustomComponents.components[key];
      if (!component.hideComponent) {
        //<li className="dropdown-item" onClick={this.insertComponent.bind(this,'condition')}>Condition</li>
        const eLi = document.createElement('li');
        eLi.classList.add('dropdown-item');
        eLi.onclick = (event) => { this.insertComponent(key, event) };
        eLi.innerText = component.description;
        panel.appendChild(eLi);
      }
    });
  }

  createComponent(componentType,left,top) {
    const result = {
      id: uuidv4(),
      type: componentType,
      data: {  },
      position: { x: left || 20, y: top || 20 },
    };
    result.position.x = Math.round((result.position.x / 5) * 5);
    result.position.y = Math.round((result.position.y / 5) * 5);

    const component = CustomComponents.getComponent(componentType);
    const defaultComponent = component.components.length > 0 ? component.components[0] : null;
    if (defaultComponent) {
      result.data.component = defaultComponent.key;
      result.data.properties = defaultComponent.properties;
    }

    return result;
  }

  insertComponent(componentType,event) {
    this.hideContextMenus();
    const container = document.getElementById('diagramContainer').getBoundingClientRect();
    const component = this.createComponent(componentType, this.contextPos.x, this.contextPos.y);
    this.selectedElement = component;
    this.updateComponentType();
    this.updateComponentPanel();
    this.refresh([...this.state.elements,component]);
  }

  onNodeContextMenu(event, node) {
    event.preventDefault();
    this.hideContextMenus();
    this.contextElement = node;
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
    this.contextElement = null;
    const nodeContextMenu = document.getElementById('nodeContextMenu');
    nodeContextMenu.style.display = null;
    const panelContextMenu = document.getElementById('panelContextMenu');
    panelContextMenu.style.display = null;
  }

  onElementsRemove(elementsToRemove) {
    const elements = removeElements(elementsToRemove, this.state.elements);
    this.refresh(elements);
  }
    
  onConnect(params) { 
    params = this.labelHandle(params);
    let elements = this.state.elements;
    elements = this.disconnectHandlers(elements, params);
    elements = addEdge(params, elements);
    this.refresh(elements);
  }

  onDelete(data) {
    console.log(data);
  }

  disconnectHandlers(elements, params) {
    if (params.targetHandle !== NODE_HANDLE_TYPE.input.multiple) {
      const remove = this.state.elements.filter(item => item.target === params.target);
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
    this.selectedElement = element;
    this.updateComponentPanel();
  }

  onSelectionChange(elements) {
    if (!elements) {
      this.selectedElement = null;
      this.updateComponentPanel();  
    }
  }

  updateComponentPanel() {
    const selectComponent = document.getElementById('diagramComponentType');
    const inputId = document.getElementById('diagramComponentId');
    const panel = document.getElementById('componentPanel');
    
    panel.classList.add('invisible');
    if (this.selectedElement) {
      const component = CustomComponents.getComponent(this.selectedElement.type);
      if (component) {
        inputId.value = this.selectedElement.data.id || '';
        while (selectComponent.length > 0) {
          selectComponent.remove(0);
        }
        component.components.forEach(subcomponent => {
          let option = document.createElement('option');
          option.value = subcomponent.key;
          option.text = subcomponent.description;
          selectComponent.add(option);
        });
        selectComponent.value = this.selectedElement.data.component;
        panel.classList.remove('invisible');
      }
    }
  }

  onComponentTypeChange(event) {
    if (this.selectedElement) {
      const value = event.target?.value;
      this.selectedElement.data.component = value;
      this.updateComponentType();
      this.refresh();
    }
  }

  onComponentIdChange(event) {
    if (this.selectedElement) {
      const value = event.target?.value;
      this.selectedElement.data.id = value;
      this.refresh();
    }
  }

  updateComponentType() {
    if (this.selectedElement) {
      const component = CustomComponents.getComponent(this.selectedElement.type);
      const componentType = component.components.find(item => item.key === this.selectedElement.data.component);
      this.selectedElement.data.label = componentType.shortDescription;
    }
  }

  refresh(elements) {
    this.setState({ elements: elements || this.state.elements });
  }

  render() {
    this.props.instanceController.setActiveMenu("/diagram");

    return (
      <section>
        <div className="diagram-container" id="diagramContainer">
          <ReactFlow
            elements={this.state.elements}
            nodeTypes={CustomComponents.nodes()}
            zoomOnScroll={false}
            zoomOnPinch={false}
            panOnScroll={true}
            zoomOnDoubleClick={false}
            snapToGrid={true}
            snapGrid={[5,5]}
            onElementsRemove={this.onElementsRemove.bind(this)}
            onConnect={this.onConnect.bind(this)}
            onLoad={this.onLoad.bind(this)}
            selectNodesOnDrag={true}
            onElementClick={this.onElementClick.bind(this)}
            onSelectionChange={this.onSelectionChange.bind(this)}
            onNodeContextMenu={this.onNodeContextMenu.bind(this)}
            onPaneClick={this.onPaneClick.bind(this)}
            onPaneContextMenu={this.onPaneContextMenu.bind(this)}
          >
          </ReactFlow>
        </div>
        <footer className="diagram-component-panel py-3 bg-light" id="componentPanel">
          <div className="row px-3">
            <div className="col-md-4">
              <div className="form-label-group">
                <select className="form-select w-100" id="diagramComponentType" onChange={this.onComponentTypeChange.bind(this)}>
                </select>
                <label htmlFor="diagramComponentType">Component</label>
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-label-group">
                <input type="input" className="form-control" id="diagramComponentId" placeholder="Optional" onBlur={this.onComponentIdChange.bind(this)} />
                <label htmlFor="diagramComponentId">ID (optional)</label>
              </div>
            </div>
            <div className="col-md-6 text-right">
              <button type="button" className="btn btn-info btn-lg">Properties</button>
              <button type="button" className="ml-2 btn btn-danger btn-lg">Delete</button>
            </div>
          </div>
        </footer>
        <div className="dropdown">
          <ul className="dropdown-menu" id="nodeContextMenu">
            <li><h6 className="dropdown-header">Selected component</h6></li>
            <li><a className="dropdown-item" href=";">Action</a></li>
            <li><a className="dropdown-item" href=";">Another action</a></li>
          </ul>
        </div>
        <div className="dropdown">
          <ul className="dropdown-menu" id="panelContextMenu" role="menu">
            <li><h6 className="dropdown-header">Add component</h6></li>
            {/* <li className="dropdown-item" onClick={this.insertComponent.bind(this,'xyz')}>Xyz</li> */}
          </ul>
        </div>
      </section>
    );
  }
}

export default FlowDiagram;
