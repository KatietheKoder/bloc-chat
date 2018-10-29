import React, { Component } from "react";
import * as firebase from "firebase";

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };

    this.messagesRef = this.props.firebase.database().ref("messages");
  }

  componentDidMount() {
    let temp = [];
    this.messagesRef.on("child_added", snapshot => {
      console.log(snapshot.val());
      temp.push(snapshot.val());
      this.setState({
        messages: temp
      });

      console.log(this.state.messages);
    });
  }

  render() {
    const activeRoom = this.props.activeRoom;

    let result = this.state.messages.map((message, index) => {
      
      if (message.roomId == activeRoom) {
        return <li key={index}>{message.content}</li>;
      }
    });

    return (
      <div id="messages">
        <ul>{result}</ul>
      </div>
    );
  }
}

export default MessageList;
