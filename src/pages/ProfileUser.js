import React, { Component } from 'react'
import NavUser from '../components/NavUser'
import UserProfileBody from '../components/UserProfileBody'


 class ProfileUser extends Component {
    render() {
        return (
            <>
                <NavUser classN='fixes'/>
                <UserProfileBody />
            </>
        )
    }
}

export default ProfileUser
