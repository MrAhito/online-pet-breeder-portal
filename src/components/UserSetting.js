import React from 'react'
import { useHistory } from 'react-router-dom'
import { firebaseApp } from '../firebase/firebase'
import * as Icons from 'react-icons/cg'
import './UserSetting.css'

function UserSetting(props) {
    const history = useHistory();


    const logOut = () => {
      firebaseApp.auth().signOut().then(() => {
        history.push('/')
        console.log('User Successfully SignOut')
      }).catch((error) => {
          console.log('Error unexpectedly happen during SignOut')
      })
      
    }


    return (
        <>
        <div className='setinds'>
           <div className='title_div'>{props.titleName}</div>
                <div onClick={logOut} className='btn-logout'>
                <Icons.CgLogOut/>
                    Log Out
                </div>
        </div>
        </>
    )
}

export default UserSetting
