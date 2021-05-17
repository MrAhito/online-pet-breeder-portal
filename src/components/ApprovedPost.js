import React, { useEffect, useState } from 'react'
import db from '../firebase/firebase'

function ApprovedPost() {

    const [PostAppr, setPostApr] = useState([])   

    useEffect(() => {
    const fetchData = async () => {
      const data = await db.collection("post/approved/post").get()
      setPostApr(data.docs.map(doc => doc.data()))
    }
    fetchData()
    }, [])
    return (
        <>
         {PostAppr.map((Posts, index) => (
            <div className='divwa' key={index}>
            <div className='SPost-wrapper' >
                <div className='posterInfo'>
                <img src={Posts.postedByImg} alt='profile' className='posterDp'></img>
                <div className='posterName'>{Posts.postedByName}</div>
                <p className='posttime'>{new Date((Posts.timestamp.seconds)*1000.0177648).toUTCString()}</p>
                </div>
                <blockquote className='postDataText'>{Posts.post}</blockquote>
                <img src={Posts.photoURL} alt=''/>
                <div className='postTagss'>Tags: {(Posts.tags) + ";"}</div>
            </div>
            </div>
        ))}
        </>
    )
}

export default ApprovedPost
