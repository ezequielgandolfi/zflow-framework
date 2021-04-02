export const SET_ACTIVE_MENU = 'MENU/SET_ACTIVE_MENU';
export const UPDATE_MENU = 'MENU/UPDATE_MENU';

function createAction(type) {
  return (payload) => ({ type, payload });
}


export const setActiveMenu = createAction(SET_ACTIVE_MENU);
export const updateMenu = createAction(UPDATE_MENU);