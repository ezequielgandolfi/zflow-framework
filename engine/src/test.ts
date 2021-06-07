export const REPEAT = [
  {
    id: "8f0b7cc6-9676-45ac-80a7-ece9d65a17f4",
    type: "start.default",
    data: {
      id: "start",
      properties: {
        queryParam: "",
        pathParam: "",
        payload: "",
      },
      label: "Start",
    },
    position: {
      x: 10,
      y: 10,
    },
  },
  {
    id: "07dd8aed-2223-43e7-859e-de4b5036b877",
    type: "repeat.for",
    data: {
      id: "",
      properties: {
        from: "1",
        to: "$(8f0b7cc6-9676-45ac-80a7-ece9d65a17f4.pathParam.repeat)",
      },
      label: "From",
    },
    position: {
      x: 140,
      y: 35,
    },
  },
  {
    source: "8f0b7cc6-9676-45ac-80a7-ece9d65a17f4",
    sourceHandle: "ok",
    target: "07dd8aed-2223-43e7-859e-de4b5036b877",
    targetHandle: "single",
    animated: true,
    type: "smoothstep",
    id: "reactflow__edge-8f0b7cc6-9676-45ac-80a7-ece9d65a17f4ok-07dd8aed-2223-43e7-859e-de4b5036b877single",
  },
  {
    id: "6a6b2617-5f94-4e18-ae3a-f17aaa238747",
    type: "function.log",
    data: {
      id: "",
      properties: {
        text: "$(07dd8aed-2223-43e7-859e-de4b5036b877.current)",
      },
      label: "Log",
    },
    position: {
      x: 240,
      y: 35,
    },
  },
  {
    source: "07dd8aed-2223-43e7-859e-de4b5036b877",
    sourceHandle: "repeat",
    target: "6a6b2617-5f94-4e18-ae3a-f17aaa238747",
    targetHandle: "single",
    animated: true,
    type: "smoothstep",
    id: "reactflow__edge-07dd8aed-2223-43e7-859e-de4b5036b877ok-6a6b2617-5f94-4e18-ae3a-f17aaa238747single",
  },
  {
    id: "68feedf4-da75-4e05-9506-bf9adedd052f",
    type: "function.log",
    data: {
      id: "",
      properties: {
        text: "FIM DO LOOP",
      },
      label: "Log",
    },
    position: {
      x: 345,
      y: 35,
    },
  },
  {
    source: "07dd8aed-2223-43e7-859e-de4b5036b877",
    sourceHandle: "end",
    target: "68feedf4-da75-4e05-9506-bf9adedd052f",
    targetHandle: "single",
    animated: true,
    type: "smoothstep",
    id: "reactflow__edge-07dd8aed-2223-43e7-859e-de4b5036b877ok-68feedf4-da75-4e05-9506-bf9adedd052fsingle",
  },
];

export const JOIN_ALL = [
  {
    "id": "fdcbaec1-dfee-4d6b-afd7-a2f4adf22976",
    "type": "start.default",
    "data": {
      "id": "start",
      "properties": {},
      "label": "Start"
    },
    "position": {
      "x": 10,
      "y": 10
    }
  },
  {
    "id": "b58019ab-1ba5-425f-b6e5-549a2b290f9d",
    "type": "function.log",
    "data": {
      "id": "",
      "properties": {
        "text": "INICIO"
      },
      "label": "Log"
    },
    "position": {
      "x": 125,
      "y": 25
    }
  },
  {
    "source": "fdcbaec1-dfee-4d6b-afd7-a2f4adf22976",
    "sourceHandle": "ok",
    "target": "b58019ab-1ba5-425f-b6e5-549a2b290f9d",
    "targetHandle": "single",
    "animated": true,
    "type": "smoothstep",
    "id": "reactflow__edge-fdcbaec1-dfee-4d6b-afd7-a2f4adf22976ok-b58019ab-1ba5-425f-b6e5-549a2b290f9dsingle"
  },
  {
    "id": "c17353e2-724d-4430-b49d-83fa685ced93",
    "type": "repeat.for",
    "data": {
      "id": "",
      "properties": {
        "from": "1",
        "to": "3"
      },
      "label": "For"
    },
    "position": {
      "x": 230,
      "y": 40
    }
  },
  {
    "id": "22fb7c58-bbd5-4ec7-9645-9fd83f534e0e",
    "type": "function.log",
    "data": {
      "id": "",
      "properties": {
        "text": "$(c17353e2-724d-4430-b49d-83fa685ced93.current)"
      },
      "label": "Log"
    },
    "position": {
      "x": 430,
      "y": 30
    }
  },
  {
    "source": "c17353e2-724d-4430-b49d-83fa685ced93",
    "sourceHandle": "repeat",
    "target": "22fb7c58-bbd5-4ec7-9645-9fd83f534e0e",
    "targetHandle": "single",
    "animated": true,
    "type": "smoothstep",
    "label": "Repeat",
    "labelBgPadding": [
      8,
      4
    ],
    "labelBgBorderRadius": 4,
    "labelBgStyle": {
      "fill": "lightgreen",
      "color": "#fff",
      "fillOpacity": 0.7
    },
    "id": "reactflow__edge-c17353e2-724d-4430-b49d-83fa685ced93repeat-22fb7c58-bbd5-4ec7-9645-9fd83f534e0esingle"
  },
  {
    "id": "d2dba2aa-a4dd-4f06-9c92-f4f26a505912",
    "type": "process.wait-all",
    "data": {
      "id": "",
      "properties": {},
      "label": "All"
    },
    "position": {
      "x": 455,
      "y": 115
    }
  },
  {
    "source": "b58019ab-1ba5-425f-b6e5-549a2b290f9d",
    "sourceHandle": "ok",
    "target": "c17353e2-724d-4430-b49d-83fa685ced93",
    "targetHandle": "single",
    "animated": true,
    "type": "smoothstep",
    "id": "reactflow__edge-b58019ab-1ba5-425f-b6e5-549a2b290f9dok-c17353e2-724d-4430-b49d-83fa685ced93single"
  },
  {
    "source": "b58019ab-1ba5-425f-b6e5-549a2b290f9d",
    "sourceHandle": "ok",
    "target": "d2dba2aa-a4dd-4f06-9c92-f4f26a505912",
    "targetHandle": "multi",
    "animated": true,
    "type": "smoothstep",
    "id": "reactflow__edge-b58019ab-1ba5-425f-b6e5-549a2b290f9dok-d2dba2aa-a4dd-4f06-9c92-f4f26a505912multi"
  },
  {
    "source": "c17353e2-724d-4430-b49d-83fa685ced93",
    "sourceHandle": "end",
    "target": "d2dba2aa-a4dd-4f06-9c92-f4f26a505912",
    "targetHandle": "multi",
    "animated": true,
    "type": "smoothstep",
    "label": "End",
    "labelBgPadding": [
      8,
      4
    ],
    "labelBgBorderRadius": 4,
    "labelBgStyle": {
      "fill": "lightblue",
      "color": "#fff",
      "fillOpacity": 0.7
    },
    "id": "reactflow__edge-c17353e2-724d-4430-b49d-83fa685ced93end-d2dba2aa-a4dd-4f06-9c92-f4f26a505912multi"
  },
  {
    "id": "f917f658-f2a7-47e0-a5ae-cd77a79a5d55",
    "type": "function.log",
    "data": {
      "id": "",
      "properties": {
        "text": "FIM"
      },
      "label": "Log"
    },
    "position": {
      "x": 510,
      "y": 145
    }
  },
  {
    "source": "d2dba2aa-a4dd-4f06-9c92-f4f26a505912",
    "sourceHandle": "ok",
    "target": "f917f658-f2a7-47e0-a5ae-cd77a79a5d55",
    "targetHandle": "single",
    "animated": true,
    "type": "smoothstep",
    "id": "reactflow__edge-d2dba2aa-a4dd-4f06-9c92-f4f26a505912ok-f917f658-f2a7-47e0-a5ae-cd77a79a5d55single"
  }
];

export const JOIN_FIRST = [
  {
    "id": "fdcbaec1-dfee-4d6b-afd7-a2f4adf22976",
    "type": "start.default",
    "data": {
      "id": "start",
      "properties": {},
      "label": "Start"
    },
    "position": {
      "x": 10,
      "y": 10
    }
  },
  {
    "id": "b58019ab-1ba5-425f-b6e5-549a2b290f9d",
    "type": "function.log",
    "data": {
      "id": "",
      "properties": {
        "text": "INICIO"
      },
      "label": "Log"
    },
    "position": {
      "x": 125,
      "y": 25
    }
  },
  {
    "source": "fdcbaec1-dfee-4d6b-afd7-a2f4adf22976",
    "sourceHandle": "ok",
    "target": "b58019ab-1ba5-425f-b6e5-549a2b290f9d",
    "targetHandle": "single",
    "animated": true,
    "type": "smoothstep",
    "id": "reactflow__edge-fdcbaec1-dfee-4d6b-afd7-a2f4adf22976ok-b58019ab-1ba5-425f-b6e5-549a2b290f9dsingle"
  },
  {
    "id": "c17353e2-724d-4430-b49d-83fa685ced93",
    "type": "repeat.for",
    "data": {
      "id": "",
      "properties": {
        "from": "1",
        "to": "3"
      },
      "label": "For"
    },
    "position": {
      "x": 230,
      "y": 40
    }
  },
  {
    "id": "22fb7c58-bbd5-4ec7-9645-9fd83f534e0e",
    "type": "function.log",
    "data": {
      "id": "",
      "properties": {
        "text": "$(c17353e2-724d-4430-b49d-83fa685ced93.current)"
      },
      "label": "Log"
    },
    "position": {
      "x": 430,
      "y": 30
    }
  },
  {
    "source": "c17353e2-724d-4430-b49d-83fa685ced93",
    "sourceHandle": "repeat",
    "target": "22fb7c58-bbd5-4ec7-9645-9fd83f534e0e",
    "targetHandle": "single",
    "animated": true,
    "type": "smoothstep",
    "label": "Repeat",
    "labelBgPadding": [
      8,
      4
    ],
    "labelBgBorderRadius": 4,
    "labelBgStyle": {
      "fill": "lightgreen",
      "color": "#fff",
      "fillOpacity": 0.7
    },
    "id": "reactflow__edge-c17353e2-724d-4430-b49d-83fa685ced93repeat-22fb7c58-bbd5-4ec7-9645-9fd83f534e0esingle"
  },
  {
    "id": "d2dba2aa-a4dd-4f06-9c92-f4f26a505912",
    "type": "process.wait-first",
    "data": {
      "id": "",
      "properties": {},
      "label": "First"
    },
    "position": {
      "x": 455,
      "y": 115
    }
  },
  {
    "source": "b58019ab-1ba5-425f-b6e5-549a2b290f9d",
    "sourceHandle": "ok",
    "target": "c17353e2-724d-4430-b49d-83fa685ced93",
    "targetHandle": "single",
    "animated": true,
    "type": "smoothstep",
    "id": "reactflow__edge-b58019ab-1ba5-425f-b6e5-549a2b290f9dok-c17353e2-724d-4430-b49d-83fa685ced93single"
  },
  {
    "source": "b58019ab-1ba5-425f-b6e5-549a2b290f9d",
    "sourceHandle": "ok",
    "target": "d2dba2aa-a4dd-4f06-9c92-f4f26a505912",
    "targetHandle": "multi",
    "animated": true,
    "type": "smoothstep",
    "id": "reactflow__edge-b58019ab-1ba5-425f-b6e5-549a2b290f9dok-d2dba2aa-a4dd-4f06-9c92-f4f26a505912multi"
  },
  {
    "source": "c17353e2-724d-4430-b49d-83fa685ced93",
    "sourceHandle": "end",
    "target": "d2dba2aa-a4dd-4f06-9c92-f4f26a505912",
    "targetHandle": "multi",
    "animated": true,
    "type": "smoothstep",
    "label": "End",
    "labelBgPadding": [
      8,
      4
    ],
    "labelBgBorderRadius": 4,
    "labelBgStyle": {
      "fill": "lightblue",
      "color": "#fff",
      "fillOpacity": 0.7
    },
    "id": "reactflow__edge-c17353e2-724d-4430-b49d-83fa685ced93end-d2dba2aa-a4dd-4f06-9c92-f4f26a505912multi"
  },
  {
    "id": "f917f658-f2a7-47e0-a5ae-cd77a79a5d55",
    "type": "function.log",
    "data": {
      "id": "",
      "properties": {
        "text": "FIM"
      },
      "label": "Log"
    },
    "position": {
      "x": 510,
      "y": 145
    }
  },
  {
    "source": "d2dba2aa-a4dd-4f06-9c92-f4f26a505912",
    "sourceHandle": "ok",
    "target": "f917f658-f2a7-47e0-a5ae-cd77a79a5d55",
    "targetHandle": "single",
    "animated": true,
    "type": "smoothstep",
    "id": "reactflow__edge-d2dba2aa-a4dd-4f06-9c92-f4f26a505912ok-f917f658-f2a7-47e0-a5ae-cd77a79a5d55single"
  }
];