import React, { Component } from 'react'
import * as iIcons from 'react-icons/fi'
import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebase'
import './USerPostDiv.css'

class USerPostDiv extends Component {
    constructor() {
        super()
        this.state = {
            userName: '',
            userProfile: ''
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
                        <input type='text' name='textPost' className='inputUserPost' placeholder='Create a Post  here....'></input>
                </div>
                    <div className='btton_post'>
                        <div className='btnss'>
                            <iIcons.FiImage className='btnIcon' /><span className='btnLabel'>Add Image</span>
                        </div>
                        <div className='btnss'><iIcons.FiTag className='btnIcon' /><span className='btnLabel'>Add Image</span></div>

                    </div>
              </div>
            </>
        )
    }
}

export default USerPostDiv
