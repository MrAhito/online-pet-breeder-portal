import React, { Component } from 'react'
import * as iIcons from 'react-icons/fi'
import loadGIF from '../images/loading.gif'
import { Link } from 'react-router-dom';
import Select from 'react-select';
import db, { auth } from '../firebase/firebase'
import { PostTDataTags } from './SelectData';
import PostIcon from '../images/addFiles.svg'
import './USerPostDiv.css'
import Axios from 'axios';
import ApprovedPost from './ApprovedPost';

class USerPostDiv extends Component {
    constructor(props) {
        super(props)

        this.hidFileInput = React.createRef();
        this.postTA = React.createRef();
        this.postSelect = React.createRef();

        this.state = {
            postStat: null,
            userName: '',
            userProfile: '',
            loadVisi:false,
            ImgVisi: false,
            postImgUp: null,
            postImg: 'https://res.cloudinary.com/pet-breeding/image/upload/v1621078686/aw_bymouj.png',
            tagVal: [],
        }
    }

     getID () {
       auth.onAuthStateChanged(user => {
        if(!( user === null)){
            this.setState({
             userName : user.displayName,
             userProfile : user.photoURL,
            })
         }else{
            
         }
        });
    }

     onImgChange (event) {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2){
                this.setState({postImg : reader.result})
            }
        }
        reader.readAsDataURL(event.target.files[0])
        this.setState({postImgUp : event.target.files[0]})
}
    

    showPost () { 
        this.setState(
            {postStat: true,}
        )
    }

    hidePost(){
        this.setState({
            postStat : false,
        })
    }
    

     DdlHandler (e) {
        this.setState({
            tagVal :  Array.isArray(e)? e.map(x => x.label): []
        })
    }
    
async  uploadImage (imgUser) {
    const  formData = new FormData()
    var linking = ''
       formData.append('file', imgUser, imgUser.name);
       formData.append('upload_preset', 'r5byh8yh')
       await Axios.post("https://api.cloudinary.com/v1_1/pet-breeding/image/upload", formData, {
           onUploadProgress : progressEvent => {
               console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')}
       }).then(res => { 
           const link = res.data.url
           linking = link;
       })
       .catch (err => { console.error(err)})
         return(linking)
}
    
async Posting () {
    this.setState({
        loadVisi :true,
    })
    var b = this.postTA.current.value;
    var a = '';
    if(!(this.state.postImgUp === null)){
         a = await this.uploadImage(this.state.postImgUp);
        console.log("Link user fetch: " + a );
     }
     this.UploadPostData(a, b);
}

async setData(uids, image, postData){
        const userRef = db.collection("post/submitted/post/");
        const sanp = await userRef.get();
            if(!sanp.exists){
                try {
                   await userRef.add({
                        timestamp : new Date(),
                        photoURL : image,
                        post: postData,
                        postedBy : uids,
                        postedByName: this.state.userName,
                        postedByImg: this.state.userProfile,
                        tags : this.state.tagVal,
                        status: 'pending',
                    }).then(res => {
                        db.doc("post/submitted/post/"+res.id).set({postID : res.id,}, { merge: true })
                        console.log('Post Submitted Successfully');
                        window.location.reload(false);
                    })
                }catch (error) {
                     console.log("Error in creating post info", error);
                }
            }
    }

   UploadPostData(a, b){
    try{
        auth.onAuthStateChanged(user => {
            if(!( user === null)){
             const ids = user.uid
             this.setData(ids, a, b)
                 }
             }) 
         }catch(error){
             console.error(error);
         }
   }

    componentDidMount(){
        this.getID();
    } 
    render() {
        return (
            <>
              <div className='New_post'>
                <div className='user_post'>
                        <Link to='/userprofile'>
                            <img src={this.state.userProfile} alt='icon' onClick={this.toProfile} className='iconUserPost' />
                        </Link>
                    <input type='text'  onClick={this.showPost.bind(this)} name='textPost'  className='inputUserPost' placeholder='Create a Post  here....'/>
                </div>
                    <div className='btton_post'>
                        <div className='btnss' onClick={this.showPost.bind(this)}>
                            <div className='postbutt'>
                                <iIcons.FiClipboard className='btnIcon' /><span className='btnLabel'>Add Post</span>
                            </div>
                        </div>
                        
                    </div>

                <div className={ this.state.postStat ? 'postingDiv hide' : 'postingDiv'}>
                    <div className='postInput'>
                            <img src={this.state.userProfile} alt='icon' onClick={this.toProfile} className='iconUserPost' />
                            <textarea placeholder='Create a Post  here....' className='textAPostt'  ref={this.postTA} />
                    </div>

                    <div className='postInput'>
                            <img src={PostIcon} title='Add Image' className='ImgPost' alt='logo' onClick={(e) => {this.hidFileInput.current.click();}} />
                            <input style={{display: 'none'}} type='file'  ref={this.hidFileInput} onChange = {(e) => {this.onImgChange(e)}} />
                            <img alt='icon' src={this.state.postImg} className='postImage' />
                        </div>

                        <div className='postInput'>
                            <div className='titleTags'>Tags:</div>
                            <Select className='TagSelect' id='tagSelect' ref={this.postSelect } options={PostTDataTags} onChange={this.DdlHandler.bind(this)}  isMulti isSearchable />
                        </div>
                        <div className='postInput'>
                            <div className='postbutt' onClick={(e) => {this.Posting()}}>
                                <span className='btnLabel'>Submit Post</span>
                            </div>
                        </div>
                        <div className={this.state.loadVisi ? 'loadingPage hide': 'loadingPage'}>
                        <div className='load-wrapper'>
                        <img src={loadGIF} alt='loading'/>
                            <h1 className='loadStat'>Loading...</h1>
                        </div>
                        </div>
                </div>
                <div onClick={this.hidePost.bind(this)} className={this.state.postStat ? 'blocker hide': 'blocker'}/>
              </div>
              <ApprovedPost/>

            </>
        )
    }
}

export default USerPostDiv
