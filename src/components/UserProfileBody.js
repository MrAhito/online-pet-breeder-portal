import React, { Component } from 'react'
import db, { auth } from '../firebase/firebase';
import * as aiIcons from 'react-icons/cg'
import * as Icons from 'react-icons/fi'
import * as mdIcons from 'react-icons/md'
import './UserProfileBody.css'
 class UserProfileBody extends Component {
   
    constructor() {
        super()
        this.state = {
            UserFName: '',
            UserLName: '',
            ProfilePic: '',
            UserID: '',
            Gender: '',
            Address: '',
            Email: '',
            Birthdate: '',
            Password: '',
            ContactNum: '',
            timestamp: '',
            PetData: [],

        }
    }

    async  getDoc(db, id) {
        const cityRef = db.collection('users').doc(id);
        const doc = await cityRef.get();
        try{
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          const datas =  doc.data();
        this.setState({
            UserFName : datas.Firstname,
            UserLName : datas.Lastname,
            ProfilePic : datas.photoURL,
            UserID : datas.uid,
            Birthdate: datas.Birthdate,
            Gender : datas.Gender,
            Address : datas.Address,
            Email : datas.email,
            Password : datas.Pasword,
            ContactNum : datas.phoneNum,
            timestamp: datas.Timestamp,
                });
            }
            console.log(this.state.timestamp.seconds)
        }catch(error){
            console.error(error)
        }
      }

      getIDuser () {
          try{
       auth.onAuthStateChanged(user => {
           if(!( user === null)){
            const ids = user.uid
           this.getDoc(db, ids);
                }
            }) 
        }catch(error){
            console.error(error);
        }
    }
    
    componentDidMount(){
        this.getIDuser();
    } 
    render() {
        return (
            <>
            <div className='userProfile_wrapper'>
                <div className='coverPic'/>
                <img src={this.state.ProfilePic} alt='Profile' className='profilePicture'></img>
                    <p className='usernames'>{this.state.UserFName}  {this.state.UserLName}</p>
                    <div className='userTabs'>
                        <div className='UAbtab' title='About'><Icons.FiInfo className='iconTab' /><span className='nameTab'>About</span></div>
                        <div className='UAbtab' title='Friends'><mdIcons.MdPeople className='iconTab' /><span className='nameTab'>Friends</span></div>
                        <div className='UAbtab' title='Post'><aiIcons.CgFileDocument className='iconTab' /><span className='nameTab'>Post</span></div>
                        <div className='UAbtab' title='Pets'><mdIcons.MdPets className='iconTab' /><span className='nameTab'>Pets</span></div>
                    </div>
                    <div className='infoWrapper'>
                        <div className='basicInfo'>
                            <h1 className='titleBasic'>Contact Information: </h1>
                            <div className='contactInfo'><Icons.FiMail className='infoIcon' /><span className='infoLabel'>Email Address:  </span><span className='infoVal'>{this.state.Email}</span></div>
                            <div className='contactInfo'><Icons.FiMapPin className='infoIcon' /><span className='infoLabel'>Home Address:  </span><span className='infoVal'>{this.state.Address}</span></div>
                            <div className='contactInfo'><Icons.FiPhone className='infoIcon' /><span className='infoLabel'>Contact Number:  </span><span className='infoVal'>{this.state.ContactNum}</span></div>
                        </div>
                        <div className='basicInfo'>
                            <h1 className='titleBasic'>Basic Information: </h1>
                            <div className='contactInfo'><Icons.FiGift className='infoIcon' /><span className='infoLabel'>Birthdate:  </span><span className='infoVal'>{this.state.Birthdate}</span></div>
                            <div className='contactInfo'><aiIcons.CgGenderFemale className='infoIcon' /><span className='infoLabel'>Gender:  </span><span className='infoVal'>{this.state.Gender}</span></div>
                        </div>
                    </div>
            </div>
            </>
        )
    }
}

export default UserProfileBody