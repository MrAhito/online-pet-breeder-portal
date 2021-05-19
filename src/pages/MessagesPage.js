import React from 'react'
// import { useLocation, useParams } from 'react-router'
import Messages from '../components/Messages'
import NavUser from '../components/NavUser'

function MessagesPage() {
    // const { handle } = useParams()
    // const location = useLocation()
    // const { uid } = location.state
    // const [user, setUser] = React.useState(null)
  
    // React.useEffect(() => {
    //   fetch(`https://api.twitter.com/user/${handle}`)
    //     .then(setUser(uid))
    // }, [uid, handle])

    return (
        <div>
            <NavUser/>
            <Messages />
        </div>
    )
}

export default MessagesPage
