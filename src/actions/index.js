import { UPDATE_ELEMENTS } from './actionTypes';

function createAction(type) {
  return (payload) => ({ type, payload });
}


export const updateElements = createAction(UPDATE_ELEMENTS);