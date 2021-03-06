import React, { Component } from "react";

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      formCache: ""
    };

    this.roomsRef = this.props.firebase.database().ref("rooms");
  }

  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({
        rooms: this.state.rooms.concat(room)
      });
    });
  }

  createRoom = event => {
    event.preventDefault();

    this.roomsRef.push({
      name: this.state.formCache
    });

    this.setState({
      formCache: ""
    });
  };

  handleChange = event => {
    this.setState({
      formCache: event.target.value
    });
  };

  render() {
    const RoomList = this.state.rooms.map(room => {
      return (
        <li key={room.key} onClick={() => this.props.setRoom(room.key)}>
          {" "}
          {room.name}.{" "}
        </li>
      );
    });

    return (
      <div>
        <h2> Add a room:</h2>
        <form onSubmit={this.createRoom}>
          <input
            type="text"
            onChange={event => this.handleChange(event)}
            value={this.state.formCache}
          />
          <input type="submit" />
        </form>
        <div className="SelectRoom">
          <ul>{RoomList}</ul>
        </div>
      </div>
    );
  }
}

export default RoomList;
