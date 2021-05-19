import React, { useEffect, useState } from 'react'
import db from '../firebase/firebase'
import './UserPostings.css'

function UserPostings(props) {
    const [emtd, setemtd] = useState(false)   
    const [emta, setemta] = useState(false)   
    const [emts, setemts] = useState(false)   
    const [Post, setPost] = useState([])   
    const [PostDec, setPostDec] = useState([])   
    const [PostAppr, setPostAppr] = useState([])   

    useEffect(() => {
        const fetchData = async () => {
          const data = await db.collection("post/submitted/post").where('postedBy', '==', props.uids).get()
          const data2 = await db.collection("post/declined/post").where('postedBy', '==', props.uids).get()
          const data3 = await db.collection("post/approved/post").where('postedBy', '==', props.uids).get()
          if((data2.docs.map(doc => doc.data())).length===0){
            setemtd(true)
          }else{setemtd(false)}
          if((data.docs.map(doc => doc.data())).length===0){
            setemta(true)
          }else{setemta(false)}
          if((data3.docs.map(doc => doc.data())).length===0){
            setemts(true)
          }else{setemts(false)}


          setPost(data.docs.map(doc => doc.data()))
          setPostDec(data2.docs.map(doc => doc.data()))
          setPostAppr(data3.docs.map(doc => doc.data()))
        }
        fetchData()
        })
    return (
        <>
        <div className='titlePost'>Submitted Post(s):</div>
        <div className='posting'>

        {Post.map((Posts, index) => (
            <div className='divwa postinSub' key={index}>
            <div className='SPost-wrapper adadad' >
                <div className='posterInfo'>
                <img src={Posts.postedByImg} alt='profile' className='posterDp imdad'></img>
                <div className='posterName'>{Posts.postedByName}</div>
                <p className='posttime'>{new Date((Posts.timestamp.seconds)*1000.0177648).toUTCString()}</p>
                </div>
                <blockquote className='postDataText'>{Posts.post}</blockquote>
                <img src={Posts.photoURL} alt=''/>
                <div className='postTagss adasd'>Tags: {(Posts.tags) + ";"}</div>
            </div>
            </div>
        ))}
        <div className={emta ? 'checkEmty' : 'checkEmty hidp' }>
        <div className='divwa' >
            <div className='SPost-wrapper' >
                <div className='posterInfo'>
                    <h1>No post Available</h1>                            
                </div>
            </div>
            </div>
        </div>

        </div>
            
        <div className='titlePost'>Approved Post(s):</div>
        <div className='posting'>

        {PostAppr.map((Posts, index) => (
            <div className='divwa imdad'  key={index}>
            <div className='SPost-wrapper ' >
                <div className='posterInfo '>
                <img src={Posts.postedByImg} alt='profile' className='posterDp '></img>
                <div className='posterName'>{Posts.postedByName}</div>
                <p className='posttime'>{new Date((Posts.timestamp.seconds)*1000.0177648).toUTCString()}</p>
                </div>
                <blockquote className='postDataText'>{Posts.post}</blockquote>
                <img src={Posts.photoURL} alt=''/>
                <div className='postTagss'>Tags: {(Posts.tags) + ";"}</div>
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

        </div>
            
        <div className='titlePost'>Declined Post(s):</div>
        <div className='posting'>

        {PostDec.map((Posts, index) => (
            <div className='divwa postinSub' key={index}>
            <div className='SPost-wrapper adada' >
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
        <div className={emtd ? 'checkEmty' : 'checkEmty hidp' }>
        <div className='divwa' >
            <div className='SPost-wrapper' >
                <div className='posterInfo'>
                    <h1>No post Available</h1>                            
                </div>
            </div>
            </div>
        </div>

        </div>
            
        </>
    )
}

export default UserPostings
