import React from 'react'
import './UserDashboard.css'
import USerLeftDiv from './USerLeftDiv'
import USerPostDiv from './USerPostDiv'
import USerRightDiv from './USerRightDiv'
function UserDashboard() {
    return (
        <>
            <div className='userDashBoard_div'>
                <div className='left_div'>
                <USerLeftDiv/>
                </div>
                <div className='middle_div'>
                <USerPostDiv/>
                </div>
                <div className='right_div'>
                <USerRightDiv/>
                </div>
            </div>
        </>
    )
}

export default UserDashboard
