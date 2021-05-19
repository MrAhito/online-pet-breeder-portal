import React, { useEffect, useState } from 'react'
import db from '../firebase/firebase'
import * as Icons from 'react-icons/fa'
import { Link } from 'react-router-dom'


function OfflineUsers() {
    const [onLine, setonLine] = useState([])
    useEffect(() => {
        const fetchData = async () => {
          const data = await db.collection("users").where('isOnline', '==', false).get()
          setonLine(data.docs.map(doc => doc.data()))
        }
        fetchData()
        }, [])
    return (
        <>
        {onLine.map((users, index) => (
            <Link to={{ pathname: `/users/${users.uid}`, state: users.uid }} key={index} className='online offle'>

                <Icons.FaDotCircle className='OLIcon ogli'/>
                <img  className='oLImg' alt=''src={users.photoURL} />
                <div className='oLUser'>{users.Firstname + " " +users.Lastname}</div>
            </Link>
    ))}
        </>
    )
}

export default OfflineUsers
