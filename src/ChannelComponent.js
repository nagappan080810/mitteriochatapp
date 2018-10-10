import React, { Component } from 'react';
import './Channel.css';
export default class ChannelComponent extends Component {
    constructor() {
        super();

        this.state = {
            activeChannel: null
        }
    }

    /*componentDidUpdate() {
        if (Object.keys(this.props.channelMessages).length > 0) {
            this.setActiveChannel(Object.keys(this.props.channelMessages)[0])()
        }
    }*/

    renderChannelList() {
        return Object.keys(this.props.channelMessages).map(channelId => {
            const isChannelActive = this.state.activeChannel === channelId;
            console.log(channelId + " " + isChannelActive);
            return (
                <div
                    key={channelId}
                    className={ 'channel-tile' +
                        ((isChannelActive) ? ' active' : '') }
                    onClick={this.setActiveChannel(channelId)}
                >
                    { channelId }
                </div>
            );
        })
    }

    renderMessages() {
        if (this.state.activeChannel === null) {
            return (<div></div>);
        }

        const activeChannelMessages =
            this.props.channelMessages[this.state.activeChannel]

        const currentUser = this.props.loggedUser;


        return activeChannelMessages.map(message => {
            const isSelfMessage =
                currentUser === message.senderId.identifier;

            return (
                <div key={message.messageId}
                     className={ 'message' + (isSelfMessage ? ' self' : '') }
                >
                    <div className='message-block'>
                        <span className='sender'>{message.senderId.identifier}</span>

                        <div className='message-content'>
                            {message.textPayload}
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className='chat-parent chat-panel'>
                <div className='channel-list'>
                    { this.renderChannelList() }
                </div>
                <div className='chat-window chat-panel'>
                    { this.renderMessages() }
                    <div className='message-input-box'>
                        <input className='message-input' type='text' />
                        &nbsp;
                        <input className='send-message' type='submit' value='Send' />
                    </div>
                </div>
            </div>
        );
    }

    setActiveChannel(channelId) {
        return () => {
            this.setState((prevState) => Object.assign({}, prevState, {
                activeChannel: channelId
            }))
        }
    }
}