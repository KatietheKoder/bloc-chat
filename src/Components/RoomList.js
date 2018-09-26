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

      const RoomList = this.state.rooms.map((room)=>{

      return ( <li key={room.key} onClick={ (e) => {this.selectRoom(room,e)} }> {room.name}.

      </li>);

  })

  let roomForm = (
  <div id= 'SelectRoom'>
  <form onSubmit={this.createRoom}>
     <h2>Add a room:</h2>
     <input type="text" value={this.state.name} placeholder="Type room name" onChange={this.roomChange} />
     <input type="submit" value="Submit"/>
   </form>

 );

return (
        <div className='selectRoom'>
          <ul>{RoomList}</ul>
          <ul>{RoomForm}</ul>
        </div>
      );
}

export default RoomList;
