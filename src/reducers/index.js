import { combineReducers } from 'redux';
import { diagramReducer } from './diagramReducer';
import { menuReducer } from './menuReducer';

export const Reducers = combineReducers({
  diagramState: diagramReducer,
  menuState: menuReducer
});