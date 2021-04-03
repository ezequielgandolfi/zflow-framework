import { UPDATE_MENU } from "../actions/menuActions";
import Diagram from "../components/Diagram/Diagram";
import DashboardPage from "../pages/DashboardPage";

const _initialState = {
  menus: [
    { link: '/', name: 'Dashboard', enabled: true, component: DashboardPage },
    { link: '/diagram', name: 'Test Diagram', enabled: true, component: Diagram },
  ]
};

export const menuReducer = (state = _initialState, action) => {
  switch (action.type) {
    case UPDATE_MENU:
      return {
        ...state,
        menus: [...action.payload]
      };
    default:
      return state;
  }
}