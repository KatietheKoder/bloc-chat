import React, { Component } from "react";
import * as firebase from "firebase";
import Timestamp from "react-timestamp";
import './Styles/MessageList.css';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      user: "",
      roomId: "",
      messages: []
    };

    this.messagesRef = this.props.firebase.database().ref("messages");
    this.messageContent = this.messageContent.bind(this);
  }

  messageContent(e) {
    e.preventDefault();
    console.log(e.target.value);
    this.setState({
      content: e.target.value
    });
  }

  createMessage = e => {
    e.preventDefault();
    console.log(this.props.user);
    this.messagesRef.push({
      user: this.props.user ? this.props.user.displayName : "Guest",
      sentAt: firebase.database.ServerValue.TIMESTAMP,
      content: this.state.content,
      roomId: this.props.activeRoom
    });

    this.setState({
      user: "",
      sentAt: "",
      content: "",
      roomId: ""
    });
  };




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
        return (
          <table key={index}>
            <tr>
              <td className="message-username">{message.user}</td>
              <td className="message-content">{message.content}</td>
              <Timestamp time={message.sentAt} format='full'  includeDay />
            </tr>
          </table>
        );
      }
    });

    return (
      <div className="messages">
        <form onSubmit={this.createMessage}>
          <input
            type="text"
            value={this.state.content}
            placeholder="Enter message here"
            onChange={this.messageContent}
          />
          <input type="submit" value="Send" />
        </form>
        <ul>{result}</ul>
      </div>
    );
  }
}

export default MessageList;
