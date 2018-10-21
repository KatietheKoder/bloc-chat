import React, { Component } from "react";
import * as firebase from "firebase";

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      content: "",
      sentAt: "",
      roomId: "",
      messages: []
    };

    this.messagesRef = this.props.firebase.database().ref("messages");
    this.createMessage = this.createMessage.bind(this);
    this.messageContent = this.messageContent.bind(this);
  }

  messageContent(e) {
    e.preventDefault();
    this.setState({
      username: this.props.user,
      content: e.target.value,
      sentAt: firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom
    });
  }

  createMessage(e) {
    e.preventDefault();
    this.messagesRef.push({
      username: this.state.username,
      content: this.state.content,
      sentAt: this.state.sentAt,
      roomId: this.state.roomId
    });

    this.setState({
      username: "",
      content: "",
      sentAt: "",
      roomId: ""
    });
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
      console.log(activeRoom + " active room from messages");
      console.log(message.roomId + " message room id from messages");

      if (message.roomId == activeRoom) {
        return <li key={index}>{message.content}</li>;
      }
    });

    const messageBox = (
      <form onSubmit={this.createMessage}>
        <input
          type="text"
          value={this.state.content}
          placeholder="Enter message here"
          onChange={this.messageContent}
        />
        <input type="submit" value="Send" />
      </form>
    );

    const currentMessages = this.state.messages.map(message => {
      if (message.roomId === activeRoom) {
        return (
          <li key={message.key}>
            {message.username}: {message.content}
          </li>
        );
      }
      return null;
    });

    return (
      <div id="messages">
        <ul>{result}</ul>
        <div> {messageBox} </div>
        <div> {currentMessages} </div>
      </div>
    );
  }
}

export default MessageList;
