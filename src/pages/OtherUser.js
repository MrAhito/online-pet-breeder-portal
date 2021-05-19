import React, { Component } from 'react'
import OtherUserProfile from '../components/OtherUserProfile'
import NavUser from '../components/NavUser'

 class OtherUser extends Component {
    render() {
        return (
            <>
                <NavUser/>
                <OtherUserProfile/>
            </>
        )
    }
}

export default OtherUser
