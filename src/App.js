import React, { Component } from 'react';
import ChannelComponent from './ChannelComponent';
import './App.css';

const channelMessages = {
    'channel-a': [{
      messageId: 'message-001',
      textPayload: 'hello world!',
      senderId: {
        identifier: '@john'
      }
    }, {
      messageId: 'message-002',
      textPayload: 'hello back!',
      senderId: {
        identifier: '@amy'
      }
    }],
    'channel-b': []
}



class App extends Component {
  constructor() {
    super();

    this.state = {
      channelMessages: {}
    }
    this.setChannels = this.setChannels.bind(this);
  }

  setChannels(participatedChannels) {
    const activeChannels = {};
    console.log("test");

    participatedChannels.forEach((participatedChannel) => {
      activeChannels[participatedChannel.channel.channelId] = []

      this.setState((prevState) => {
        return Object.assign({}, prevState, {
          activeChannels
        })
      })
    })
  }

  componentDidMount() {
    const mitter = this.props.mitter;

    console.log("didmount");
    mitter.clients().channels().participatedChannels()
        .then(participatedChannels => this.setChannels(participatedChannels))
  }

  render() {
    return (
      <div className="App">
           <h2 className="application-title">
             My Chat App
             <div className="user-label">
             	Welcome, <strong> {this.props.loggedUser}</strong>
             </div>
           </h2>
           <ChannelComponent channelMessages={this.state.channelMessages} 
                              loggedUser={this.props.loggedUser}
                              mitter={this.props.mitter} />
      </div>
    )
  }
}

export default App;
