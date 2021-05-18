import { UPDATE_MENU } from "../actions/menuActions";
import DashboardPage from "../pages/DashboardPage";
import DiagramPage from "../pages/DiagramPage";
import EnginePipelinePage from "../pages/EnginePipelinePage";

const _initialState = {
  menus: [
    { link: '/', name: 'Dashboard', enabled: true, component: DashboardPage },
    { link: '/diagram', name: 'Test Diagram', enabled: true, component: DiagramPage },
    { link: '/pipeline', name: 'Test Pipeline', enabled: true, component: EnginePipelinePage },
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