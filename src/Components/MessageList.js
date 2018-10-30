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

   this.setState({
     content: e.target.value
   });
 }

  //_____________________________________BEGIN Williams edit

 createMessage=(e)=> {                  // You forgot to bind your method - :)
     e.preventDefault();

 
     console.log("worked");
     console.log(this.state.content);
  

  };



  //_______________________________________END Williams edit



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

    console.log(this.state.content);

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
