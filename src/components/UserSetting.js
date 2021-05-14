import React from 'react'
import { useHistory } from 'react-router-dom'
import { auth } from '../firebase/firebase'
import './UserSetting.css'

function UserSetting(props) {
    const history = useHistory();


    const logOut = () => {
        history.push('/')
        auth.signOut();
    }


    return (
        <>
        <div className='setinds'>
           <div className='title_div'>{props.titleName}</div>
                <div onClick={logOut} className='title_div'>

                </div>
        </div>
        </>
    )
}

export default UserSetting
