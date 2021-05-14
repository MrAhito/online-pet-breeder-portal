import React from 'react'
import './NotifDiv.css'

function NotifDiv(props) {
     
    return (
        <div className='notify'>
           <div className='title_div'>{props.titleName}</div>
        </div>
    )
}

export default NotifDiv
