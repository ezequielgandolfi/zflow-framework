import Dashboard from "./Dashboard/Dashboard";
import FlowDiagram from "./FlowDiagram/FlowDiagram";
import Users from "./Users/Users";

class InstanceController  {

    menus = [
        { link: '/', name: 'Dashboard', active: true, enabled: true, component: Dashboard },
        { link: '/users', name: 'Users', active: false, enabled: true, component: Users },
        { link: '/diagram', name: 'Diagram', active: false, enabled: true, component: FlowDiagram },
        // { link: '/about', name: 'About', active: false, enabled: false,  },
    ];

    menuEvent = new EventTarget();

    setActiveMenu(route) {
        setTimeout(() => {
            this.menus.forEach(item => item.active = (item.link === route));
            this.menuEvent.dispatchEvent(new CustomEvent('refresh'));    
        }, 1);
    }

}

export default InstanceController;
