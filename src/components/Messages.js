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

        const recieverID =  (window.location.pathname).substring(10, 50);
        this.setState({ readError: null, resuid: recieverID, });
    try {
      
      // console.log(this.state.chat)
      const ref = db.collection('messages').where(`senderID`, `==`, this.state.user.uid ).where(`recieverID`, `==`,(window.location.pathname).substring(10, 50)).orderBy('timestamp');
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
      
      
      // db.collection("messages").where('senderID', '==', this.state.user.uid).where('recieverID', '==', (window.location.pathname).substring(10, 50)).get()
      // .orderBy('timestamp').onSnapshot(snapshot => {
      //   let chats = [];
      //   snapshot.forEach((snap) => {
      //   chats.push(snap.data());
      //   });
      //   console.log('message fetched')
      //   this.setState({ chats
      //   });
      // });
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
      await db.collection("messages").add({
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

  checkifsender(uid){
    if(uid === this.state.user.uid){
      this.setState({ senderType : true })
    }else{
      this.setState({ senderType: false })
    }
  }

  render() {
  return (
    <div>
    <div className="chats">
      {this.state.chats.map(chat => {
        return <div className={chat.uid === this.state.user.uid ? 'chat sender' : 'chat reciever'} key={chat.timestamp}>
        Mesage: {chat.content} Time: {new Date(chat.timestamp * 125).toISOString().replace('T', ' ').substring(10, 19)}</div>
      })}
    </div>
    
    <div>
        Login in as: <strong>{this.state.resuid}</strong> ----- <strong>{this.state.user.uid}</strong>
      </div>
    <form className='formmessage' onSubmit={this.handleSubmit}>
      <input placeholder='Enter your message here... ' className='InputMessage' onChange={this.handleChange} value={this.state.content}></input>
      {this.state.error ? <p>{this.state.writeError}</p> : null}
      <button className='brn-messafe' type="submit">Send</button>
    </form>
    
  </div>
        )
    }
}

export default Messages
