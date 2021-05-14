import React, { Component } from 'react'
import icon from '../images/icon.png'
import * as aiIcons from 'react-icons/cg'
import '../components/NavUser.css'
import NotifDiv from './NotifDiv'
import UserSetting from './UserSetting'
import  { auth } from '../firebase/firebase'
import { Link } from 'react-router-dom'

class NavUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            userProfile: '',
            titleName: '',
            visibke: false,
            visibleM: false,
            visibleS: false,
            visibleB: false,
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

    changeVieae(ComName, visiMe, visiNO, visiSE, visiBl) {
        this.setState({
            titleName: ComName,
            visibke: visiMe,
            visibleM: visiNO,
            visibleS: visiSE,
            visibleB: visiBl

        })
    }
    render() {
        return (
            <div className="nav userNavCon">

                <div className='navlogo-con'>
                    <img className='nav-logo navuslo' src={icon} alt="icon" />
                    <div className='search_div'>
                        <aiIcons.CgSearch className='search_icon' alt='Search_logo' title='Search'/>
                        <input placeholder='Search Here...' />
                    </div>
                </div>


                <div className='cs_div'>
                    <Link to='/dashboard' className={'CgICons mainDiv ' + this.props.classMain}>
                <aiIcons.CgFeed className='userNavIcons'  alt='newsfeed' title='Home'/>
                </Link>
                    <div className='CgICons breedDiv'>
                <aiIcons.CgTimelapse className='userNavIcons'  alt='find' title='Find Breeder   '/>
                </div>
                </div>


                <div className='userIcons'>

                <Link to='/userprofile' className={'CgICons CProfile ' + this.props.classN}  onClick={(e) => this.changeVieae('Blocker', false, false, false, false)}>
                <img src={this.state.userProfile} alt='icon' className='userNavIconsImg'/>   
                    <span className='userNavname'>{this.state.userName}</span>
                </Link>
                <div className='CgICons' onClick={(e) => this.changeVieae('Messages', false, !this.state.visibleM, false, true)}>
                    <aiIcons.CgMail className='userNavIcons'  />
                </div>
                <div  className={this.state.visibleM ? 'notif_div shiw' : 'notif_div' }>
                <NotifDiv titleName={this.state.titleName} />
                </div>
                <div  className='CgICons' onClick={(e) => this.changeVieae('Notifications', !this.state.visibke,false, false, true)} >
                    <aiIcons.CgNotifications className='userNavIcons' />
                </div>
                <div  className={this.state.visibke  ? 'notif_div shiw' : 'notif_div' }>
                <NotifDiv titleName={this.state.titleName} />
                </div>
                <div className='CgICons' onClick={(e) => this.changeVieae('Settings',false, false, !this.state.visibleS, true)} >
                    <aiIcons.CgMenu className='userNavIcons' />
                </div>
                <div  className={this.state.visibleS  ? 'notif_div shiw' : 'notif_div' }>
                <UserSetting titleName={this.state.titleName} />
                </div>
                <div  className={this.state.visibleB  ? 'blockera shiw' : 'notif_div' }
                 onClick={(e) => this.changeVieae('Blocker', false, false, false, false)}></div>

                </div>

            </div>
        )
    }
}

export default NavUser
