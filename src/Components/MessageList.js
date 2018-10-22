import React, { Component } from "react";
import * as firebase from "firebase";

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      content: "",
      messages: []
    };

    this.messagesRef = this.props.firebase.database().ref("messages");
    this.createMessage = this.createMessage.bind(this);
    this.messageContent = this.messageContent.bind(this);
  }

  messageContent(e) {
    e.preventDefault();
    this.setState({
      content: e.target.value
    });
  }

  createMessage(e) {
    e.preventDefault();
    console.log(this.state)
    this.messagesRef.push({
      user: this.props.user,
      sentAt: this.state.sentAt,
      roomId: this.state.roomId
    });

    this.setState({
      user: "",
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
            {message.user}: {message.content}
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
