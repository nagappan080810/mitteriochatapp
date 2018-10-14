import React, { Component } from 'react';
import './Channel.css';

const usersMap = {
    'O27ix-bWkkK-a9pkE-ilhN1' : '@john', 
    'JBJUx-e2xXO-QND4q-UXoph' : '@amy', 
    'VjTAZ-mHJaz-dOFun-lr9Vx' : '@candice'
}
export default class ChannelComponent extends Component {
    constructor() {
        super();

        this.state = {
            activeChannel: null,
            typedMessage: ''
        }

        this.updateTypedMessage = this.updateTypedMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    /*componentDidUpdate() {
        if (Object.keys(this.props.channelMessages).length > 0) {
            this.setActiveChannel(Object.keys(this.props.channelMessages)[0])()
        }
    }*/

    sendMessage() {
        const mitter = this.props.mitter;

        this.setState((prevState) => Object.assign({}, prevState, {
            typedMessage: ''
        }))

        this.messageInput.focus();

        console.log(this.props.channels[this.state.activeChannel]);

        const channelId = this.props.channels[this.state.activeChannel].channelId;

        mitter.clients().messages().
            sendMessage(channelId, {
                senderId: mitter.me(),
                textPayload: this.state.typedMessage, 
                timelineEvents: [{
                    type: "mitter.mtet.SentTime",
                    eventTimeMs: new Date().getTime(),
                    subject: mitter.me()
                }]
            })

        if (this.state.typedMessage.indexOf("medical") !== -1) {
            mitter.clients().messages().
            sendMessage('JXDPE-c7J1v-c77Ra-Y8YDr', {
                senderId: mitter.me(),
                textPayload: this.state.typedMessage, 
                timelineEvents: [{
                    type: "mitter.mtet.SentTime",
                    eventTimeMs: new Date().getTime(),
                    subject: mitter.me()
                }]
            })
        }
    }


    updateTypedMessage(evt) {
        const value = evt.target.value;
        this.setState((prevState) => {
            return Object.assign({}, prevState, {
                typedMessage: value
            })
        })
    }

    renderChannelList() {
        console.log(this.props);
        return Object.keys(this.props.channelMessages).map(channelId => {
            const isChannelActive = this.state.activeChannel === channelId;
            console.log("checking channel active "+isChannelActive);
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
            console.log(message.senderId.identifier);
            const msgUser = usersMap[message.senderId.identifier];
            const isSelfMessage =
                currentUser === msgUser;
            const msgDate = new Date(message.timelineEvents[0].eventTimeMs);        
            return (
                <div key={message.messageId}
                     className={ 'message' + (isSelfMessage ? ' self' : '') }
                >
                    <div className='message-block'>
                        <span className='sender'>{msgUser}</span>

                        <div className='message-content'>
                            {message.textPayload}
                            <br/><br/>
                            <div className='message-date'>{msgDate.toString("yyyy-MM-dd hh:mm:ss")}</div>
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
                        <input ref={(input)=>{this.messageInput=input}} 
                                onChange={this.updateTypedMessage}
                                value={this.state.typedMessage}
                                 className='message-input' type='text' />
                        &nbsp;
                        <input onClick={this.sendMessage} className='send-message' type='submit' value='Send' />
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