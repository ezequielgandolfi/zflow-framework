import React, { Component } from "react";
import ReactFlow, { removeElements, addEdge } from "react-flow-renderer";
import { CustomNodes, NODE_HANDLE_TYPE } from "./CustomNodes";

import "./FlowDiagram.css";

const onLoad = (reactFlowInstance) => {}; //reactFlowInstance.fitView();

const onNodeContextMenu = (event, node) => {
  event.preventDefault();
  // console.log("context menu:", node);
};

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

  initialElements = [
    {
      id: "horizontal-1",
      type: "start",
      data: { id: "start", label: "START" },
      position: { x: 0, y: 80 },
    },
    {
      id: "horizontal-2",
      type: "process",
      data: { id: "p1", label: "A Node" },
      position: { x: 250, y: 0 },
    },
    {
      id: "horizontal-3",
      type: "process",
      data: { id: "proc2", label: "Node 3" },
      position: { x: 250, y: 160 },
    },
    {
      id: "horizontal-4",
      type: "process",
      data: { label: "Node 4" },
      position: { x: 500, y: 0 },
    },
    {
      id: "horizontal-5",
      type: "process",
      data: { label: "Node 5" },
      position: { x: 500, y: 100 },
    },
    {
      id: "horizontal-6",
      type: "process",
      data: { label: "Node 6" },
      position: { x: 500, y: 230 },
    },
    {
      id: "horizontal-7",
      type: "process",
      data: { label: "Node 7" },
      position: { x: 750, y: 50 },
    },
    {
      id: "horizontal-8",
      type: "process",
      data: { label: "Node 8" },
      position: { x: 750, y: 300 },
    },
    {
      id: "horizontal-9",
      type: "stop",
      data: { label: "STOP" },
      position: { x: 850, y: 100 },
    },
    {
      id: "horizontal-10",
      type: "alert",
      data: { label: "alert" },
      position: { x: 50, y: 400 },
    },
    {
      id: "horizontal-11",
      type: "condition",
      data: { label: "condition" },
      position: { x: 150, y: 400 },
    },
    {
      id: "horizontal-12",
      type: "join",
      data: { label: "join" },
      position: { x: 250, y: 400 },
    },
    {
      id: "horizontal-13",
      type: "math",
      data: { label: "math" },
      position: { x: 350, y: 400 },
    },
    {
      id: "horizontal-14",
      type: "pause",
      data: { label: "pause" },
      position: { x: 450, y: 400 },
    },
    {
      id: "horizontal-15",
      type: "repeat",
      data: { label: "repeat" },
      position: { x: 550, y: 400 },
    },
    {
      id: "horizontal-16",
      type: "storage",
      data: { label: "storage" },
      position: { x: 650, y: 400 },
    },
    {
      id: "horizontal-17",
      type: "function",
      data: { label: "function" },
      position: { x: 50, y: 300 },
    },
    {
      id: "horizontal-18",
      type: "merge",
      data: { label: "merge" },
      position: { x: 150, y: 300 },
    },
    {
      id: "horizontal-19",
      type: "transform",
      data: { label: "transform" },
      position: { x: 250, y: 300 },
    },
    {
      id: "horizontal-20",
      type: "request",
      data: { label: "request" },
      position: { x: 350, y: 300 },
    },
    {
      id: "horizontal-21",
      type: "variable",
      data: { label: "variable" },
      position: { x: 450, y: 300 },
    },
    /* ------------------------------------------------ */
    {
      id: "horizontal-e1-2",
      source: "horizontal-1",
      type: "smoothstep",
      target: "horizontal-2",
      animated: true,
    },
    {
      id: "horizontal-e1-3",
      source: "horizontal-1",
      type: "smoothstep",
      target: "horizontal-3",
      animated: true,
    },
    {
      id: "horizontal-e1-4",
      source: "horizontal-2",
      type: "smoothstep",
      target: "horizontal-4",
      animated: true,
      label: "On Error",
      labelBgPadding: [8, 4],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: '#FF0000', color: '#fff', fillOpacity: 0.7 },
    },
    {
      id: "horizontal-e3-5",
      source: "horizontal-3",
      type: "smoothstep",
      target: "horizontal-5",
      animated: true,
    },
    {
      id: "horizontal-e3-6",
      source: "horizontal-3",
      type: "smoothstep",
      target: "horizontal-6",
      animated: true,
    },
    {
      id: "horizontal-e5-7",
      source: "horizontal-5",
      type: "smoothstep",
      target: "horizontal-7",
      animated: true,
      style: {stroke:"red"},
    },
    {
      id: "horizontal-e6-8",
      source: "horizontal-6",
      type: "smoothstep",
      target: "horizontal-8",
      animated: true,
    },
  ];

  state = { elements: this.initialElements };

  onElementsRemove(elementsToRemove) {
    // this.setElements((els) => removeElements(elementsToRemove, els));
    const elements = removeElements(elementsToRemove, this.state.elements);
    this.setState({ elements: elements });
  }
    
  onConnect(params) { 
    // this.setElements((els) => addEdge(params, els));
    params = this.labelHandle(params);
    let elements = this.state.elements;
    elements = this.disconnectHandlers(elements, params);
    elements = addEdge(params, elements);
    this.setState({ elements: elements });
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
    console.log(event, element); 
  }

  render() {
    this.props.instanceController.setActiveMenu("/diagram");

    return (
      <section>
        <div className="diagram-container">
          <ReactFlow
            elements={this.state.elements}
            nodeTypes={CustomNodes}
            zoomOnScroll={false}
            zoomOnPinch={false}
            panOnScroll={true}
            zoomOnDoubleClick={false}
            snapToGrid={true}
            snapGrid={[5,5]}
            onElementsRemove={this.onElementsRemove.bind(this)}
            onConnect={this.onConnect.bind(this)}
            onLoad={onLoad}
            selectNodesOnDrag={true}
            onElementClick={this.onElementClick.bind(this)}
            onNodeContextMenu={onNodeContextMenu}
          >
          </ReactFlow>
        </div>
        <footer className="diagram-component-panel py-3 bg-light">
        <div className="row px-3">
          <div className="col-md">
            <div className="form-label-group">
              <select className="form-select w-100" id="diagramComponentType">
                <option selected>Select one...</option>
                <option value="1">ABCDEF</option>
                <option value="2">Component Blabla</option>
                <option value="3">T23 A1</option>
              </select>
              <label for="diagramComponentType">Component</label>
            </div>
          </div>
          <div className="col-md">
            <div className="form-label-group">
              <input type="input" className="form-control" id="diagramComponentId" placeholder="Optional" />
              <label for="diagramComponentId">ID</label>
            </div>
          </div>
          
        </div>
        </footer>
      </section>
    );
  }
}

export default FlowDiagram;
