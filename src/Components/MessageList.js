import React, { Component } from 'react';



class MessageList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            messages: [],


        }

        this.messagesRef = this.props.firebase.database().ref('messages')

    }

    componentDidMount() {
        let temp = [];
        this.messagesRef.on('child_added', snapshot => {
            console.log(snapshot.val());
            temp.push(snapshot.val())
            this.setState({
                messages: temp
            })

            console.log(this.state.messages);
        });
    }


    createMessage(e) {
      e.preventDefault();
      this.messagesRef.push(
        {
          content: this.state.content,
          sentAt: this.state.sentAt,
          roomId: this.state.roomId,
          username: this.props.currentUser
        }
      );
       this.setState ({
         message: "",
         sentAt: "",
         roomId: ""
      })
      e.target.reset()
     };

   render() {

      const activeRoom = this.props.activeRoom

      const currentMessages = (
     this.state.messages.map((message)=> {
       if (message.roomId === activeRoom) {
         return <li key={message.key}>{message.content}</li>
       }
       return null;
     })
   );

        return (
          <div id="messages">
          </div>

        )
    }
}

export default MessageList;
