import React, { Component } from "react";



class MessageList extends Component {
  constructor(props){
    super(props)
    this.state = {
      messages:[]

      }

    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {

    this.roomsRef.on('child_added', snapshot => {
         const message = snapshot.val();
         message.key = snapshot.key;
         this.setState({ messages: this.state.messages.concat( message ) })

          });
       }


  render() {


      const RoomList = this.state.rooms.map((room)=>{

      return ( <li key={room.key} onClick={ (e) => {this.selectRoom(room,e)} }> {room.name}.

      </li>)

  })

    return (
      <div className= 'SelectRoom'>
        <ul>{RoomList}</ul>
      </div>
    );
  }
}

export default MessageList;
