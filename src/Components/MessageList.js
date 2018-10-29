import React, { Component } from "react";
import * as firebase from "firebase";

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      content: "",
      roomId: "",
      messages: []
    };

    this.messagesRef = this.props.firebase.database().ref("messages");
    this.createMessage = this.createMessage.bind(this);
    this.messageContent = this.messageContent.bind(this);
  }

  messageContent(e) {
    e.preventDefault();
    console.log(e.target.value);
    this.setState({
      content: e.target.value
    });
  }

  createMessage(e) {
    e.preventDefault();
    console.log(this.props.activeRoom);
    this.messagesRef.push({
      user: this.props.user,
      sentAt: "6:00",
      roomId: this.props.activeRoom,
      content: this.state.content
    });

    this.setState({
      user: "",
      sentAt: "",
      content: ""
    });
  }

  componentDidMount() {
    let temp = [];
    this.messagesRef.on("child_added", snapshot => {
      temp.push(snapshot.val());
      this.setState({
        messages: temp
      });
    });
  }

  render() {
    const activeRoom = this.props.activeRoom;

    let result = this.state.messages.map((message, index) => {
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

    const currentMessages = this.state.messages.map((message, index) => {
      if (message.roomId === activeRoom) {
        return (
          <li key={index}>
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
