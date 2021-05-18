import React from 'react'
import loadGIF from '../images/loading.gif'
import './LoadSc.css'
function LoadSc(props) {
    return (
        <div>
        <div className={props.Stat ? 'loadingPage hide': 'loadingPage'}>
        <div className='load-wrapper'>
        <img src={loadGIF} alt='loading'/>
            <h1 className='loadStat'>Loading...</h1>
        </div>
        </div>
        </div>
    )
}

export default LoadSc
