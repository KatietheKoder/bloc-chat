import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as firebase from "firebase";
import RoomList from "./Components/RoomList";

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
      activeRoom: '',

    }
  }

  makeActiveRoom = room => {
    this.setState({ activeRoom : room })
  }



  render() {
  return (
      <div className="App">
        <RoomList
        firebase={firebase}
        makeActiveRoom={this.makeActiveRoom}
        activeRoom={this.state.activeRoom}
        />
      </div>
    );
  }
}

export default App;
