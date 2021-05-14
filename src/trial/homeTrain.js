import React, { Component } from 'react'
import './homeTrain.css'
import TrialPage from './TrialPage'

 class homeTrain extends Component {
    render() {
        return (
            <>
            <div className='train_div'>
            <h1> Hello I am the Train page Header</h1>
            <TrialPage/>
            </div>
            </>
        )
    }
}

export default homeTrain
