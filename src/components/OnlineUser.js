import React, { useEffect, useState } from 'react'
import db, { auth } from '../firebase/firebase'
import * as Icons from 'react-icons/fa'
import { Link } from 'react-router-dom'

function OnlineUser() {
    const [onLine, setonLine] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const id = auth.currentUser.uid;
          const data = await db.collection("users").where('isOnline', '==', true).where('uid', '!=', id).get()
          setonLine(data.docs.map(doc => doc.data()))
        }
        fetchData()
        }, [])
    return (
        <>
        {onLine.map((users, index) => (
           
            <Link to={{ pathname: `/users/${users.uid}`}} onClick={(e) => {console.log(users.uid)}} key={index} className='online'>
                <Icons.FaDotCircle className='OLIcon'/>
                <img  className='oLImg' alt=''src={users.photoURL} />
                <div className='oLUser'>{users.Firstname + " " +users.Lastname}</div>
            </Link>
    ))}
        </>
    )
}

export default OnlineUser
