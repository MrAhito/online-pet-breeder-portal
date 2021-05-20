import React, { Component } from 'react'
import db, { auth } from '../firebase/firebase';
import './Messages.css'
 class Messages extends Component {
    constructor(props) {
    super(props);
    this.state = {
      user: auth.currentUser,
      chats: [],
      content: '',
      resuid : '',
      readError: null,
      writeError: null,
      senderType : true,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    try {
      const recieverID =  (window.location.pathname).substring(10, 50);
      const userId =   this.state.user.uid 
      this.setState({ readError: null, resuid: recieverID, });
      console.log(userId)
      const ref = await  db.collection('messages/inbox/message').orderBy('timestamp');
      console.log(ref)
      ref.onSnapshot(ref, snapshop=>{
        console.log(snapshop)
        let chats = [];
          snapshop.forEach((snap) => {
          chats.push(snap.data());
          });
          console.log('message fetched')
          this.setState({ chats
          });
        });
    } catch (error) {
      this.setState({ readError: error.message });
    }
  }

  handleChange(event) {
    this.setState({
      content: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ writeError: null });
    try {
      await db.collection('messages/inbox/message').add({
        content: this.state.content,
        timestamp: new Date(),
        uid: this.state.user.uid,
        senderID: this.state.user.uid,
        recieverID: this.state.resuid,
      });
      this.setState({ content: '' });
    } catch (error) {
      this.setState({ writeError: error.message });
      console.log(this.state.writeError)
    }
  }

  render() {
  return (
    <>
    <div className='inboxes'>
    </div>
    <div className="chats">
      {this.state.chats.map(chat => {
        return <div className={this.state.user.uid === chat.senderID ? 'chat sender' : 'chat reciever'} key={chat.timestamp}><span className='contentSpan'>{chat.content}</span> 
        <span className='timestampspan'>{new Date(chat.timestamp * 125).toISOString().replace('T', ' ').substring(10, 19)}</span></div>
      })}
    </div>
    
    <div>
      </div>
    <form className='formmessage' onSubmit={this.handleSubmit}>
      <input placeholder='Enter your message here... ' className='InputMessage' onChange={this.handleChange} value={this.state.content}></input>
      {this.state.error ? <p>{this.state.writeError}</p> : null}
      <button className='brn-messafe' type="submit">Send</button>
    </form>
    
  </>
        )
    }
}

export default Messages
