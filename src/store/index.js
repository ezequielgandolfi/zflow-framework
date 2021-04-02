import { applyMiddleware, createStore } from 'redux';
import { Middlewares } from '../middleware';
import { Reducers } from '../reducers';

export const Store = createStore(
  Reducers,
  applyMiddleware(...Middlewares)
);
