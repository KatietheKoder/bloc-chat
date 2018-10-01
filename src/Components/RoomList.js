import React, { Component } from "react";



class RoomList extends Component {
  constructor(props){
    super(props)
    this.state = {
      rooms:[],
      newRoomName: '',

      }

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {

    this.roomsRef.on('child_added', snapshot => {
         const room = snapshot.val();
         room.key = snapshot.key;
         this.setState({ rooms: this.state.rooms.concat( room ),
         newRoomName: '',

        })

          });
       }

       handleChange = e => {
         e.preventDefault();
         this.setState({ newRoomName: e.target.value });
       }

       createRoom = e => {
         e.preventDefault();
             if (this.state.newRoomName) {
               const newRoom = { name: this.state.newRoomName
               };
           this.roomsRef.push(newRoom);
         }
       }

       activeRoom = room => {
         this.props.makeActiveRoom( room );
         this.setState({ display: true });
       }

       deleteRoom(index){
         this.roomsRef.child(index.key).remove();
         this.setState({ rooms: this.state.rooms.filter(room => room !== index) })
       }

  render() {

    return (

      <div className="selectRoom"/>
      {this.state.rooms.map((room) => {

      <li key={room.key} onClick={ (e) => this.selectRoom(room, e) (room.name)} >
      </li>

      <div className= "RoomForm"/>
      <form onSubmit={this.createRoom}>
      <h2>Add a room:</h2>
      <input type="text" value={this.state.name} placeholder="Type room name" onChange={this.roomChange} />
      <input type="submit" value="Submit"/>
      </form>
      )
    }
  );
}

export default RoomList;
