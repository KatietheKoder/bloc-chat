import React, { Component } from "react";



class RoomList extends Component {
  constructor(props){
    super(props)
    this.state = {
      rooms:[]

      }

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {

    this.roomsRef.on('child_added', snapshot => {
         const room = snapshot.val();
         room.key = snapshot.key;
         this.setState({ rooms: this.state.rooms.concat( room ) })

          });
       }


  activeRoom = room => {
         this.props.makeActiveRoom( room );
         this.setState({ display: true });
       }


  render() {


      const RoomList = this.state.rooms.map((room)=>{

      return ( <li key={room.key} onClick={ (e) => this.selectRoom(room,e) }> {room.name}.

      </li>)

  })

    return (
      <div className= 'SelectRoom'>
      <form onSubmit={this.createRoom}>
      <h2>Add a room:</h2>
      <input type="text" value={this.state.name} placeholder="Type room name" onChange={this.roomChange} />
      <input type="submit" value="Submit"/>
      </form>
      <ul>{RoomList}</ul>
      </div>
    );
  }
}

export default RoomList;
