import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import db from '../firebase/firebase';

function InboxMessages(props) {
    const [inbox, setinbox] = useState([])
    const [userdata, setuserdata] = useState([])
    useEffect(() => {
        try{
        const fetchData = async (e) => {
            e.preventDefault();
            const id = (window.location.pathname).substring(10, 50);
            console.log(id)
            const user = await db.collection('users').where('uid', `==`, (window.location.pathname).substring(10, 50)).get();
            setuserdata(user.docs.map(doc => doc.data()));
        const data = await db.collection("messages").doc('inboxes').collection((window.location.pathname).substring(10, 50)).get()
        setinbox(data.docs.map(doc => doc.data()))
        }
    }catch(error){
        
    }
            console.log(userdata);
        },)
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
