import React, { Component } from "react";
import "./App.css";
import * as firebase from "firebase";
import RoomList from "./Components/RoomList";
import MessageList from "./Components/MessageList";
import User from "./Components/User.js";

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
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: "",
      user: null
    };
  }

  setRoom = roomKey => {
    this.setState({
      activeRoom: roomKey
    });
  };

  setUser = user => {
    console.log("USER:", user);
    this.setState({
      user: user
    });
  };

  render() {
    //console.log(this.state.activeRoom);
    const activeUser = this.props.user ? this.props.user.displayName : "Guest";

    return (
      <div className="App">
        <User
          firebase={firebase}
          setUser={this.setUser}
          userHere={activeUser}
        />
        <RoomList
        firebase={firebase}
        setRoom={this.setRoom}
        />
        <MessageList
        firebase={firebase}
        activeRoom={this.state.activeRoom}
        user={this.props.user}
        />
        <User
        firebase={firebase}
        User={this.state.user}
        />
      </div>
    );
  }
}

export default App;
