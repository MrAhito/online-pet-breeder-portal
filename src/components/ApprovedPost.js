import React, { useEffect, useState } from 'react'
import db from '../firebase/firebase'
import * as cgIcons from 'react-icons/md'

function ApprovedPost() {

    const [PostAppr, setPostApr] = useState([])   
    const [emts, setemts] = useState(false)   

    useEffect(() => {
    const fetchData = async () => {
      const data = await db.collection("post/approved/post").orderBy('timestamp').get()
      if((data.docs.map(doc => doc.data())).length===0){
        setemts(true)
      }else{setemts(false)}
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
                <div className='actBtndiv'>
                <div className='actBtn apr'><cgIcons.MdFeedback className='iconPos'/><span className='btnosttil'>Feedback</span></div>
             </div>
            </div>
            </div>
        ))}
        <div className={emts ? 'checkEmty' : 'checkEmty hidp' }>
        <div className='divwa' >
            <div className='SPost-wrapper' >
                <div className='posterInfo'>
                    <h1>No post Available</h1>                            
                </div>
            </div>
            </div>
        </div>
        </>
    )
}

export default ApprovedPost
