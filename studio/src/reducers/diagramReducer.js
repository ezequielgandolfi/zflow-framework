import { SET_CONTEXT_ELEMENT, SET_SELECTED_ELEMENT, UPDATE_ELEMENTS } from "../actions/diagramActions";

const _initialState = {
  elements: [], 
  selectedElement: null,
  contextElement: null
};

export const diagramReducer = (state = _initialState, action) => {
  switch (action.type) {
    case UPDATE_ELEMENTS:
      return {
        ...state,
        elements: action.payload
      }
    case SET_SELECTED_ELEMENT:
      return {
        ...state,
        selectedElement: action.payload
      }
    case SET_CONTEXT_ELEMENT:
      return {
        ...state,
        contextElement: action.payload
      }
    default:
      return state;
  }
}