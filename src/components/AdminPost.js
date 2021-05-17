import React, { useEffect, useState } from 'react'
import db from '../firebase/firebase'
import * as cgIcons from 'react-icons/ai'
import './AdminPost.css'
import ApprovedPost from './ApprovedPost'
function AdminPost() {

    const [submit, setsubmit] = useState(true)   
    const [approve, setapprove] = useState(false)   
    const [decline, setdecline] = useState(false)   
    const [warn, setwarn] = useState(false)   
    const [Post, setPost] = useState([])   
    const [PostDec, setPostDec] = useState([])   

    useEffect(() => {
    const fetchData = async () => {
      const data = await db.collection("post/submitted/post").get()
      const data2 = await db.collection("post/declined/post").get()
      setPostDec(data2.docs.map(doc => doc.data()))
      setPost(data.docs.map(doc => doc.data()))
    }
    fetchData()
    })

    const ApprovePost = (acrt, postid,poserName, photo, post, poserId, poserDp, tag, time) => {
        const postRef = db.doc("post/"+acrt+"/post/"+postid);
        postRef.set({
            postID:postid,
            postedByName:poserName,
            photoURL:photo,
            post:post,
            postedBy:poserId,
            postedByImg:poserDp,
            status:'approved',
            tags:tag,
            timestamp:time,
        }).then(res => {
            console.log("Post moved to Approved");
        db.doc("post/submitted/post/"+postid).delete().then(
                console.log("post deleted in submtted"),
        )
        });
        
    }
    const tabopne = (s, a ,d) => {
        setsubmit(s);
        setapprove(a);
        setdecline(d);
        
    }

    return (
        <>
           <div className='postWrapper'>
                <div className='post-con'>
                <div className='titlePost'>Admin Post</div>
                        <div className='posTabs'>
                        <div className={submit ? 'posttabs on' : 'posttabs'} onClick={(e) => {tabopne(true, false, false)}}>Submitted Post</div>
                        <div className={approve ? 'posttabs on' : 'posttabs'} onClick={(e) => {tabopne(false, true, false)}}>Approved Post</div>
                        <div className={decline ? 'posttabs on' : 'posttabs'} onClick={(e) => {tabopne(false, false, true)}}>Declined Post</div>
                        </div>
                        <div className={submit ? 'post-wrap' : 'post-wrap hidp'}>
                        
                            {Post.map((Posts, index) => (
                                <div className='divwa' key={index}>
                                <div className='SPost-wrapper' onClick={(e) => {setwarn(true)}} >
                                    <div className='posterInfo'>
                                    <img src={Posts.postedByImg} alt='profile' className='posterDp'></img>
                                    <div className='posterName'>{Posts.postedByName}</div>
                                    <p className='posttime'>{new Date((Posts.timestamp.seconds)*1000.0177648).toUTCString()}</p>
                                    </div>
                                    <blockquote className='postDataText'>{Posts.post}</blockquote>
                                    <img src={Posts.photoURL} alt=''/>
                                    <div className='postTagss'>Tags: {(Posts.tags) + ";"}</div>
                                </div>
                                
                                 <div className={warn ? 'warning-wrapper move' : 'warning-wrapper '}>
                                 <div className='warning-div'>
                                    <div className='closeWarn' onClick={(e) => {setwarn(false); console.log(warn)}}><cgIcons.AiOutlineClose/></div>
                                     <h1 className='titleWard'>Are you sure you want to approve or decline this post?</h1>
                                     <div className='actBtndiv'>
                                    <div onClick={(e) => 
                                    {ApprovePost("approved",Posts.postID, Posts.postedByName, Posts.photoURL, Posts.post, Posts.postedBy,
                                        Posts.postedByImg, Posts.tags, Posts.timestamp )}} 
                                    className='actBtn apr'><cgIcons.AiOutlineCheck className='iconPos'/><span className='btnosttil'>Approve</span></div>
                                 <div onClick={(e) => 
                                    {ApprovePost("declined",Posts.postID, Posts.postedByName, Posts.photoURL, Posts.post, Posts.postedBy,
                                        Posts.postedByImg, Posts.tags, Posts.timestamp )}} 
                                         className='actBtn dec '><cgIcons.AiOutlineClose className='iconPos'/><span className='btnosttil'>Decline</span></div>
                                 </div>
                                 </div>
                                 </div>
                                </div>
                            ))}

                    </div>   
                    <div className={approve ? 'post-wrap' : 'post-wrap hidp'}>
                        <ApprovedPost/>
                    </div>   
                    <div className={decline ? 'post-wrap' : 'post-wrap hidp'}>
                    {PostDec.map((Posts, index) => (
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
                    </div>   
                    
                   
                </div>
           </div>
        </>
    )
}

export default AdminPost
