import React from 'react'
import LogoNav from '../images/logo.png'
import './Navigation.css'
function Navigation() {
    return (
        <>
            <div className='nav'>
                <img alt="logo" src={LogoNav} className="nav-logo" />
            </div>
        </>
    )
}

export default Navigation
