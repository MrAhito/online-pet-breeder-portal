import React, { useEffect, useState } from 'react'
import db from '../firebase/firebase'
import * as cgIcons from 'react-icons/ai'
import './AdminPost.css'
import ApprovedPost from './ApprovedPost'
import LoadSc from './LoadSc.js'
function AdminPost() {

    const [submit, setsubmit] = useState(true)   
    const [approve, setapprove] = useState(false)   
    const [decline, setdecline] = useState(false)   
    const [warn, setwarn] = useState(false)   
    const [emta, setemta] = useState(false)   
    const [emtd, setemtd] = useState(false)   
    const [Post, setPost] = useState([])   
    const [PostDec, setPostDec] = useState([])   
    const [ind, setind] = useState('');
    const [loadVisi, setloadVisi] = useState(false)

    useEffect(() => {
    const fetchData = async () => {
      const data = await db.collection("post/submitted/post").get()
      const data2 = await db.collection("post/declined/post").get()
      if((data2.docs.map(doc => doc.data())).length===0){
        setemtd(true)
      }else{setemtd(false)}
      if((data.docs.map(doc => doc.data())).length===0){
        setemta(true)
      }else{setemta(false)}
      setPost(data.docs.map(doc => doc.data()))
      setPostDec(data2.docs.map(doc => doc.data()))
    }
    fetchData()
    })

    const ApprovePost = (acrt, postid,poserName, photo, post, poserId, poserDp, tag, time) => {

        // console.log(acrt + "\n" +  postid + "\n" + poserName + "\n" +  photo + "\n" +  post + "\n" + poserId + "\n" + poserDp + "\n" + 
        //  tag + "\n" + time)
        setloadVisi(true);
         const postRef = db.doc("post/"+acrt+"/post/"+postid);
         setwarn(false)
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
         db.doc("post/submitted/post/"+postid).delete();
         console.log('Post Successfully Submitted')
         setloadVisi(false)
         window.location.reload(false)
         alert('Post Succesfully ' + acrt)
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
                        <LoadSc Stat = {loadVisi} />
                            {Post.map((Posts, index) => (
                                <div className='divwa' key={index}>
                                <div className='SPost-wrapper' onClick={(e) => {setwarn(true); setind(index)}} >
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
                                    <div className='closeWarn' onClick={(e) => {setwarn(false)}}><cgIcons.AiOutlineClose/></div>
                                     <h1 className='titleWard'>Are you sure you want to approve or decline this post?</h1>
                                     <div className='actBtndiv'>
                                    <div onClick={(e) => 
                                    {ApprovePost("approved",Post[ind].postID, Post[ind].postedByName, Post[ind].photoURL, Post[ind].post, Post[ind].postedBy,
                                        Post[ind].postedByImg, Post[ind].tags, Post[ind].timestamp )}} 
                                    className='actBtn apr'><cgIcons.AiOutlineCheck className='iconPos'/><span className='btnosttil'>Approve</span></div>
                                 <div onClick={(e) => 
                                    {ApprovePost("declined",Post[ind].postID, Post[ind].postedByName, Post[ind].photoURL, Post[ind].post, Post[ind].postedBy,
                                        Post[ind].postedByImg, Post[ind].tags, Post[ind].timestamp )}} 
                                         className='actBtn dec '><cgIcons.AiOutlineClose className='iconPos'/><span className='btnosttil'>Decline</span></div>
                                 </div>
                                 </div>
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
                </div>
           </div>
        </>
    )
}

export default AdminPost
