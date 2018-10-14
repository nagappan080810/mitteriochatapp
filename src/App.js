import React, { Component } from 'react';
import ChannelComponent from './ChannelComponent';
import './App.css';
import { Mitter, isNewMessagePayload } from '@mitter-io/core';

var channelMessages = {
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

var channels = {};


class App extends Component {
  constructor() {
    super();

    this.state = {
      channelMessages: {}
    }
    this.setChannels = this.setChannels.bind(this);
    this.newMessage = this.newMessage.bind(this);
  }

  newMessage(messagePayload) {
    console.log("new message came wanna do something?");
    console.log(messagePayload);
    this.setState((prevState) => {
        const channelId = messagePayload.channelId.identifier;

        if (
                prevState.channelMessages[channelId]
                    .find(x => x.messageId === messagePayload.message.messageId)
                        !== undefined
            ) {                                                   // [2]
                return prevState
            }

        return Object.assign({}, prevState, {                 // [3]
                channelMessages: Object.assign({}, prevState.channelMessages, {
                    [messagePayload.channelId.identifier]:
                        prevState.channelMessages[messagePayload.channelId.identifier]
                                 .concat(messagePayload.message)
                })
            })
    })
  }

  setChannels(participatedChannels) {
    const activeChannels = {};
    console.log("test");

    participatedChannels.forEach((participatedChannel) => {
      activeChannels[participatedChannel.channel.channelId] = [];
      const channelName = participatedChannel.channel.entityProfile.attributes[0].value;
      channelMessages = Object.assign(channelMessages, {[channelName]:[]});
      channels = Object.assign(channels, {[channelName]:participatedChannel.channel});
      const mitter = this.props.mitter;
      console.log("participated");
      const messages = mitter.clients().messages().getMessages(participatedChannel.channel.channelId)
            .then(function(messages) {
              console.log(messages);
              channelMessages = Object.assign(channelMessages, {[channelName]:messages});
            });
      console.log(messages);
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

    mitter.subscribeToPayload(payload => {
      if (isNewMessagePayload(payload)) {
          this.newMessage(payload);
      }
    })
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
           <ChannelComponent channelMessages={channelMessages} 
                              channels={channels}
                              loggedUser={this.props.loggedUser}
                              mitter={this.props.mitter} />
      </div>
    )
  }
}

export default App;
