import { SET_ACTIVE_MENU, UPDATE_MENU } from "../actions/menuActions";
import Diagram from "../components/Diagram/Diagram";
import DashboardPage from "../pages/DashboardPage";

const initialState = {
  menus: [
    { link: '/', name: 'Dashboard', active: false, enabled: true, component: DashboardPage },
    { link: '/diagram', name: 'Test Diagram', active: false, enabled: true, component: Diagram },
  ]
};

function replaceActiveMenu(menus,activePath) {
  menus.forEach(item => item.active = (item.link === activePath));
  return menus;
}

export const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_MENU:
      return {
        ...state,
        menus: replaceActiveMenu(state.menus, action.payload)
      };
    case UPDATE_MENU:
      return {
        ...state,
        menus: [...action.payload]
      };
    default:
      return state;
  }
}