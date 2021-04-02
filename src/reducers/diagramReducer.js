import { UPDATE_ELEMENTS } from "../actions/actionTypes";

const initialState = {
  elements: [], 
  selection: { 
    show: false, 
    properties: [], 
    data: { }
  }
};

export const diagramReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ELEMENTS:
      return {
        ...state,
        elements: action.payload
      }
    default:
      return state;
  }
}