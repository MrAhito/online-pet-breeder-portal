import React, { Component } from 'react';
import UserDashboard from '../components/UserDashboard';
import NavUser from '../components/NavUser'
class Dashboard extends Component {
    render() {
        return (
            <>
                <NavUser classMain='mainfix' />
                <UserDashboard />
            </>
        )
    }
}

export default Dashboard

