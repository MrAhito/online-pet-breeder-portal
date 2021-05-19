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
      readError: null,
      writeError: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {

//     const data = await db.collection("post/approved/post").orderBy('timestamp').get()
//     if((data.docs.map(doc => doc.data())).length===0){
//     }else{
//     this.setState(data.docs.map(doc => doc.data()))
//   fetchData()
        console.log('message starting fetch')

        this.setState({ readError: null });
    try {
      db.collection("messages").onSnapshot('uid', snapshot => {
        let chats = [];
        snapshot.forEach((snap) => {
        console.log(snap.data());
        chats.push(snap.data());
        });
        console.log('message fetched')
        this.setState({ chats });
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
      await db.collection("messages").add({
        content: this.state.content,
        timestamp: new Date(),
        uid: this.state.user.uid
      });
      this.setState({ content: '' });
    } catch (error) {
      this.setState({ writeError: error.message });
      console.log(this.state.writeError)
    }
  }

  render() {
  return (
    <div>
    <div className="chats">
      {this.state.chats.map(chat => {
        return <div className='chat' key={chat.timestamp}>Mesage: {chat.content} Time: {new Date(chat.timestamp * 125).toISOString().replace('T', ' ').substring(10, 19)}</div>
      })}
    </div>
    
    <div>
        Login in as: <strong>{this.state.user.email}</strong>
      </div>
    <form onSubmit={this.handleSubmit}>
      <input onChange={this.handleChange} value={this.state.content}></input>
      {this.state.error ? <p>{this.state.writeError}</p> : null}
      <button type="submit">Send</button>
    </form>
    
  </div>
        )
    }
}

export default Messages
