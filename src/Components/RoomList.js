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


  render() {

    const RoomForm = (

      <form onSubmit={this.createRoom}>
       <formGroup>
         <inputGroup>
           <formControl type="text" name="title" value={this.state.title} placeholder="New Room" onChange={this.handleChange} />
           <button type="submit">Create</button>
       </inputGroup>
     </formGroup>
     </form>

    );

      const RoomList = this.state.rooms.map((room)=>{
      <div key={room.key} onClick={ (e) => {this.selectRoom(room,e)} }> {room.name}.
      <button className="deleteRoom" onClick= { (e) => {this.deleteRoom(room.key)} }>Delete</button>/>


  })

    return (
      <div className= 'SelectRoom'>
        <ul>{RoomForm}</ul>
        <ul>{RoomList}</ul>
      </div>
    );
  }
}

export default RoomList;
