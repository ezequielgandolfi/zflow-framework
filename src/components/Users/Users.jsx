import React, { Component } from 'react';


class Users extends Component {
    render() { 
        this.props.instanceController.setActiveMenu('/users');

        return ( <p>Users</p> );
    }
}
 
export default Users;