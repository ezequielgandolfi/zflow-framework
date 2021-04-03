import React, { Component } from "react";
import ReactFlow, { removeElements, addEdge } from "react-flow-renderer";
import { v4 as uuidv4 } from 'uuid';

import "./FlowDiagram.css";
import NodeProperties from "./NodeProperties";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateElements } from '../../actions';
import { ZFlowComponents } from "../../helpers/component";
import { NODE_HANDLE_TYPE } from "../../helpers/diagram/const";

/*

Configuracao do diagrama

- Start
  - recebe query e payload como objetos de entrada

- StopCondition: 
  - StopOnError (Aborta o processo quando ocorrer um erro nao tratado pela saida de erro do componente)
  - IgnoreErrors (Continua restante dos processos paralelos, sem abortar o processamento - Nao marca fluxo como erro, apenas se entrar no componente de Stop) 

- API
  - disponibilizar endpoint que vai chamar diretamente o fluxo em questao
  - deve ter um componente para atribuir o resultado

  
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
  # chama outro processo, permite passar os dados de entrada que serao recebidos no componente Start
  # pode tbm ser o componente que atribui o retorno do processo (usado tanto em chamadas REST como de outros processos)


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
  selectedComponent;
  contextComponent;
  contextPos = { x: 0, y: 0};

  state = { elements: this.initialElements(), selection: { show: false, properties: [], data: {} } };

  initialElements() {
    const start = this.createComponent('start', 40, 40);
    start.data.id = 'start';
    this.updateComponentType(start);
    return [ start ];
  }

  onLoad() {
    this.refreshComponentList();
    this.updateComponentPanel();
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
    // if (this.selectedElement) {
    //   this.selectedElement.classList.remove('diagram-node-selected');
    // }
    this.selectedComponent = null;
  }

  setSelectedComponent(component) {
    this.clearSelectedComponent();
    this.selectedComponent = component;
    // if (this.selectedElement) {
    //   this.selectedElement.classList.add('diagram-node-selected');
    // }
    this.refresh();
  }

  createComponent(componentType,left,top) {
    const result = {
      id: uuidv4(),
      type: componentType,
      data: {  },
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
    this.setSelectedComponent(component);
    this.updateComponentType();
    this.updateComponentPanel();
    this.refresh([...this.state.elements,component]);
    // this.refresh([...this.props.elements,component]);
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
    const elements = removeElements(elementsToRemove, this.state.elements);
    // const elements = removeElements(elementsToRemove, this.props.elements);
    this.refresh(elements);
  }
    
  onConnect(params) { 
    params = this.labelHandle(params);
    let elements = this.state.elements;
    // let elements = this.props.elements;
    elements = this.disconnectHandlers(elements, params);
    elements = addEdge(params, elements);
    this.refresh(elements);
  }

  disconnectHandlers(elements, params) {
    if (params.targetHandle !== NODE_HANDLE_TYPE.input.multiple) {
      const remove = this.state.elements.filter(item => item.target === params.target);
      // const remove = this.props.elements.filter(item => item.target === params.target);
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
    this.updateComponentPanel();
  }

  onSelectionChange(elements) {
    if (!elements) {
      this.clearSelectedComponent();
      this.updateComponentPanel();  
    }
  }

  updateComponentPanel() {
    const selectComponent = document.getElementById('diagramComponentType');
    const inputId = document.getElementById('diagramComponentId');
    const panel = document.getElementById('componentPanel');
    
    panel.classList.add('invisible');

    if (this.selectedComponent) {
      const component = ZFlowComponents.getComponent(this.selectedComponent.type);
      if (component) {
        inputId.value = this.selectedComponent.data.id || '';
        while (selectComponent.length > 0) {
          selectComponent.remove(0);
        }
        component.components.forEach(subcomponent => {
          let option = document.createElement('option');
          option.value = subcomponent.key;
          option.text = subcomponent.description;
          selectComponent.add(option);
        });
        selectComponent.value = this.selectedComponent.data.component;
        panel.classList.remove('invisible');
      }
    }
  }

  onComponentTypeChange(event) {
    if (this.selectedComponent) {
      const value = event.target?.value;
      this.selectedComponent.data.component = value;
      this.updateComponentType();
      this.refresh();
    }
  }

  onComponentIdChange(event) {
    if (this.selectedComponent) {
      const value = event.target?.value;
      this.selectedComponent.data.id = value;
      this.refresh();
    }
  }

  updateComponentType(component) {
    component = component || this.selectedComponent;
    if (component) {
      const componentClass = ZFlowComponents.getComponent(component.type);
      const componentType = componentClass.components.find(item => item.key === component.data.component);
      component.data.label = componentType.shortDescription;
    }
  }

  refresh(elements,selection) {
    // elements = elements || this.props.elements;
    // this.props.updateElements(elements);
    elements = elements || this.state.elements;
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
    const elements = this.state.elements;
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
        this.updateComponentPanel();
      }
    }
  }

  render() {
    // const { elements, updateElements } = this.props;
    // if (elements.length === 0) {
    //   updateElements(this.initialElements());
    // }

    return (
      <section>
        <div className="diagram-container" id="diagramContainer">
          <ReactFlow
            elements={this.state.elements}
            nodeTypes={ZFlowComponents.nodes()}
            zoomOnScroll={false}
            zoomOnPinch={false}
            panOnScroll={true}
            zoomOnDoubleClick={false}
            snapToGrid={true}
            snapGrid={[5,5]}
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
        <NodeProperties show={this.state.selection.show} properties={this.state.selection.properties} data={this.state.selection.data} onSave={this.onSaveProperties.bind(this)} onCancel={this.onCancelProperties.bind(this)} />
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
            {/* <div className="col-md-6 text-right">
              <button type="button" className="btn btn-info btn-lg">Properties</button>
              <button type="button" className="ml-2 btn btn-danger btn-lg">Delete</button>
            </div> */}
          </div>
        </footer>
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
  elements: store.diagramState.elements
});

const mapDispatchToProps = dispatch => bindActionCreators({ 
  updateElements 
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (FlowDiagram);
