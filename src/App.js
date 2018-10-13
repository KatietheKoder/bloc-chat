import React, { Component } from "react";
import "./App.css";
import * as firebase from "firebase";
import RoomList from "./Components/RoomList";
import MessageList from './Components/MessageList';
import User from './Components/User';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAhi6d9R5fBHKeSJ5vxMQrir90oESDR_BI",
  authDomain: "bloc-chat-ca50e.firebaseapp.com",
  databaseURL: "https://bloc-chat-ca50e.firebaseio.com",
  projectId: "bloc-chat-ca50e",
  storageBucket: "bloc-chat-ca50e.appspot.com",
  messagingSenderId: "858065703412"
};
firebase.initializeApp(config);

class App extends Component {
    constructor(props){
      super(props)
      this.state = {
        activeRoom: "",
        user: null
      }

    }

setRoom=(roomKey)=>{
  this.setState({
    activeRoom:roomKey
  })
}

setUser(user) {
   this.setState({ user: user });
 }

  render() {
    const listMessages = this.state.activeRoom;
    const activeUser = this.state.user === null ? "Guest" : this.state.user.displayName;

    return (
      <div className="App">
      <User firebase={firebase} setUser={this.setUser} userHere={activeUser} />
      <RoomList
      firebase={firebase}
      setRoom = {this.setRoom} />
      </div>
    );
  }
}

export default App;
