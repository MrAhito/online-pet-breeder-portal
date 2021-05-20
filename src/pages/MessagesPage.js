import React from 'react'
// import { useLocation, useParams } from 'react-router'
import Messages from '../components/Messages'
import NavUser from '../components/NavUser'

function MessagesPage() {

    return (
        <div>
            <NavUser/>
            <Messages />
        </div>
    )
}

export default MessagesPage
