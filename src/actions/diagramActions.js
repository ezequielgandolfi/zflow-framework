import { createAction } from "../helpers/redux";

export const UPDATE_ELEMENTS = 'DIAGRAM/UPDATE_ELEMENTS';
export const SET_SELECTED_ELEMENT = 'DIAGRAM/SET_SELECTED_ELEMENT';

export const updateElements = createAction(UPDATE_ELEMENTS);
export const setSelectedElement = createAction(SET_SELECTED_ELEMENT);