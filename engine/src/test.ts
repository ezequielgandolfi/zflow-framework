export const REPEAT = [
  {
    id: "8f0b7cc6-9676-45ac-80a7-ece9d65a17f4",
    type: "start",
    data: {
      id: "start",
      component: "trigger",
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
    type: "repeat",
    data: {
      id: "",
      component: "for",
      properties: {
        from: "1",
        to: "5",
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
    type: "function",
    data: {
      id: "",
      component: "log",
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
    type: "function",
    data: {
      id: "",
      component: "log",
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
