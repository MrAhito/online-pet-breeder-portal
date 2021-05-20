import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import db from '../firebase/firebase';

function InboxMessages(props) {
    const [inbox, setinbox] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            // const id = auth.currentUser.uid;
        const data = await db.collection("messages").doc('inboxes').collection(props.UID).get()
        setinbox(data.docs.map(doc => doc.data()))
        }
        fetchData()
        }, [props.UID])
    return (
        <>
        {inbox.map((users, index) => (
            <Link to={{ pathname: `/users/${users.uid}`}} onClick={(e) => {console.log(users.uid)}} key={index} className='online'>
                <img  className='oLImg' alt=''src={users.content} />
                <div className='oLUser'>{users.recieverID + " " +users.senderID}</div>
            </Link>
    ))}
        </>
    )
}

export default InboxMessages
