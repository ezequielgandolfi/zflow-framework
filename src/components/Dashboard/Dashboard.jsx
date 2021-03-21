import React, { Component } from 'react';


class Dashboard extends Component {

    render() { 
        this.props.instanceController.setActiveMenu('/');

        return ( <p>Dashboard</p> );
    }
}
 
export default Dashboard;