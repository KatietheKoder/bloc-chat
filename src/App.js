import React, { Component } from "react";
import "./App.css";
import * as firebase from "firebase";
import RoomList from "./Components/RoomList";
import MessageList from "./Components/MessageList";

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
      activeRoom: ""
    };
  }

  setRoom = roomKey => {
    this.setState({
      activeRoom: roomKey
    });
  };

  render() {
    console.log(this.state.activeRoom);

    return (
      <div className="App">
        <RoomList firebase={firebase} setRoom={this.setRoom} />

        <MessageList firebase={firebase} activeRoom={this.state.activeRoom} />
      </div>
    );
  }
}

export default App;
