import React, { Component } from "react";



class RoomList extends Component {
  constructor(props){
    super(props)
    this.state = {
      rooms:[]
      }
    }
    roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount()

    this.roomsRef.on('child_added', snapshot => {
         const room = snapshot.val();
         room.key = snapshot.key;
         this.setState({ rooms: this.state.rooms.concat( room ) })
         );
       }


  render() {
    const RoomList = this.state.rooms.map((rooms)=>{
         return()
       }
      )
     }
        </ul>
     </div>
      <form onSubmit={this.createRoom}>
        <formGroup>
          <inputGroup>
            <formControl type="text" name="title" value={this.state.title} placeholder="New Room" onChange={this.handleChange} />
          <imputGroup.Button>
            <Button type="submit">Create</Button>
          </imputGroup.Button>
        </inputGroup>
      </FormGroup>
    </form>
    }
  }
}

export default RoomList;
