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
            userInfo:true,
            petInfo:false,
            postInfo:false,
            friendInfo:false,
            petName:[],
            petID:[],
            petImage:[],
            Breed:[],
            petBirth:[],
            Species:[],
            Weight:[],
            Height:[],
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
           this.getPetData(db, ids);
                }
            }) 
        }catch(error){
            console.error(error);
        }
    }

    handleTabClick(a, b, c ,d){
        this.setState({
            userInfo:a,
            petInfo:b,
            postInfo:c,
            friendInfo:d,
        })
    }

   async getPetData(dbs, id){
        const PetRef = dbs.collection('pets');
        const pets = await PetRef.where('OwnerId', '==', id).get();
        if (pets.empty) {
            console.log('No matching documents.');
            return;
          }  
          pets.forEach(doc => {
              const petd = doc.data();
            this.setState({
                petName : petd.Name,
                petID : petd.PetId,
                Breed : petd.Breed,
                petBirth : petd.Birthdate,
                Species : petd.Species,
                Weight : petd.Weight,
                Height : petd.Height,
                petImage : petd.photoURL,
            })
            console.log(doc.id, '=>', doc.data());
            // console.log(this.state.petName)
          });
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
                        <div className={this.state.userInfo ? 'UAbtab info' : 'UAbtab'} title='About' onClick={(e) => {this.handleTabClick(true, false, false, false) }}><Icons.FiInfo className='iconTab' /><span className='nameTab'>About</span></div>
                        <div className={this.state.friendInfo ? 'UAbtab friend' : 'UAbtab'} title='Friends'  onClick={(e) => {this.handleTabClick(false, false, false,true) }}><mdIcons.MdPeople className='iconTab' /><span className='nameTab'>Friends</span></div>
                        <div className={this.state.postInfo ? 'UAbtab post' : 'UAbtab'} title='Post' onClick={(e) => {this.handleTabClick(false, false, true, false) }}><aiIcons.CgFileDocument className='iconTab' /><span className='nameTab'>Post</span></div>
                        <div className={this.state.petInfo ? 'UAbtab pets' : 'UAbtab'} title='Pets' onClick={(e) => {this.handleTabClick(false,true, false, false) }}><mdIcons.MdPets className='iconTab' /><span className='nameTab'>Pets</span></div>
                    </div>
                    <div className={this.state.userInfo ? 'Wrapper info' : 'Wrapper '}>
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

                    <div className={this.state.postInfo ? 'Wrapper post' : 'Wrapper '}>
                    awd
                    </div>

                    <div className={this.state.friendInfo ? 'Wrapper friend' : 'Wrapper '}>
                    ad
                    </div>

                    <div className={this.state.petInfo ? 'Wrapper pet' : 'Wrapper '}>
                        <h1 className='titleBasic'>Pet Information: </h1>
                        <div className='pet-info'>
                            <img className='petProfile' src={this.state.petImage} alt='pet'/>
                        </div>
                    </div>

            </div>
            </>
        )
    }
}

export default UserProfileBody