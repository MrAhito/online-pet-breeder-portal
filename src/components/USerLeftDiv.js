import React, { Component } from 'react'
import OfflineUsers from './OfflineUsers';
import OnlineUser from './OnlineUser';
import './USerLeftDiv.css'
 class USerLeftDiv extends Component {

    

    constructor(props){
        super(props);
        this.state = { time: new Date().getHours().toString() +" : "  +
        new Date().getMinutes().toString() +" : "  + new Date().getSeconds().toString()};
      }

      componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: Math.abs(new Date().getHours()-12).toString() +" : "  +
        new Date().getMinutes().toString() +" : "  + new Date().getSeconds().toString() }), 1000);
      }
      componentWillUnmount() {
        clearInterval(this.interval);
      }

      render(){
        return(
            <>
          <div className='UserDIv'>
          <div> { this.state.time } </div>
          <div className='otherUserDiv'>Online Users</div>  
          <div className='OLList'><OnlineUser/></div>
          <div className='otherUserDiv'>Offline Users</div>  
          <div className='OLList offl'><OfflineUsers/></div>
          <div className='OLList'></div>
          </div>
          </>
          );
      }     
 }

export default USerLeftDiv
