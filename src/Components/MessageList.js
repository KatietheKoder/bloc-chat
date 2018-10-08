import React, { Component } from 'react';
import Moment from 'react-moment';


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



    render() {
        return (
          <div id="messages">
      { this.state.messages
        .filter(message => this.props.activeRoom.key === message.roomId )
     )}
    </div>

        )


    }
}

export default MessageList
