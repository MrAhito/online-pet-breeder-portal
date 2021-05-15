import React, { Component } from 'react'
import * as iIcons from 'react-icons/fi'
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { auth } from '../firebase/firebase'
import { PostTDataTags } from './SelectData';
import PostIcon from '../images/addFiles.svg'
import './USerPostDiv.css'

class USerPostDiv extends Component {
    constructor(props) {
        super(props)
        this.state = {
            postStat: null,
            userName: '',
            userProfile: '',
        }
    }
     getID () {
       auth.onAuthStateChanged(user => {
        if(!( user === null)){
            this.setState({
             userName : user.displayName,
             userProfile : user.photoURL
            })
         }else{
            
         }
        });
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
                        <div className='btnss'>
                            <div className='postbutt'>
                                <iIcons.FiImage className='btnIcon' /><span className='btnLabel'>Add Image</span>
                            </div>
                        </div>
                        <div className='btnss'>
                            <div className='postbutt'>
                                <iIcons.FiTag className='btnIcon' /><span className='btnLabel'>Add Tag</span>            
                            </div>
                        </div>
                    </div>
                <div className={ this.state.postStat ? 'postingDiv hide' : 'postingDiv'}>
                    <div className='postInput'>
                            <img src={this.state.userProfile} alt='icon' onClick={this.toProfile} className='iconUserPost' />
                            <textarea placeholder='Create a Post  here....' className='textAPostt' />
                    </div>

                    <div className='postInput'>
                            <img src={PostIcon} title='Add Image' className='ImgPost' alt='logo' />
                            <img src={null} alt='post' className='postImage' />
                        </div>

                        <div className='postInput'>
                            <div className='titleTags'>Tags:</div>
                            <Select className='TagSelect' id='tagSelect' options={PostTDataTags} isMulti isSearchable />
                        </div>
                        <div className='postInput'>
                            <div className='postbutt'>
                                <span className='btnLabel'>Submit Post</span>
                            </div>
                        </div>
                </div>
                <div onClick={this.hidePost.bind(this)} className={this.state.postStat ? 'blocker hide': 'blocker'}/>
              </div>
            </>
        )
    }
}

export default USerPostDiv
