import React, { Component } from 'react'
import Login from '../components/Login'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
class HomePage extends Component {
    render() {

        return (
            <>
            <Navigation />
            <Login />
            <Footer />
            </>
        )
    }
}

export default HomePage
