import { UPDATE_ELEMENTS } from "../actions/actionTypes";

function testMiddleware({ dispatch }) {
  return (next) => {
    return (action) => {
      // if (action.type === UPDATE_ELEMENTS) {
      //   console.log('HELLO!!');
      // }
      return next(action);
    }
  }
}

export const Middlewares = [
  testMiddleware 
];