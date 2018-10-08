import React, { Component } from 'react';


class MessageList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            messages: []

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
            <div>
              <ul>
               "List rooms here"
              </ul>

            </div>

        )



    }
}

export default MessageList
