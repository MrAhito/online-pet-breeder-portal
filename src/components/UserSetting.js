import React from 'react'
import db, { auth } from '../firebase/firebase'
import * as Icons from 'react-icons/cg'
import './UserSetting.css'

function UserSetting(props) {


    const logOut = () => {
      
      let id = auth.currentUser.uid;

      db.collection('users').doc(id).update({
        isOnline: false,
      }).then(user => {
        auth.signOut();
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
