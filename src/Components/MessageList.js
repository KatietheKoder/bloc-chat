import React, { Component } from "react";
import * as firebase from "firebase";

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
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

 createMessage=(e)=> {
     e.preventDefault();
     console.log(this.props.activeRoom);
     this.messagesRef.push({
       sentAt: "8:00",
       content: this.state.content,
       roomId: this.props.activeRoom
     });

     this.setState({
       sentAt: "",
       content: ""
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

      if (message.roomId == activeRoom) {
        return <li key={index}>{message.content}</li>;
      }
    });

    return (
      <div id="messages">
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
