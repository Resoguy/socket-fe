import React from 'react';
import { io } from 'socket.io-client';
import Card from '../../components/Card';
import Tabs from '../../components/Tabs';
import s from './Chat.module.css';


class Chat extends React.Component {
    state = {
        socket: null,
        message: '',
        chatHistory: [],
        username: '',
        isChatAvailable: false,
        chatRooms: [],
        selectedRoom: null
    }

    componentDidMount() {
        const socket = io('http://localhost:4400');

        socket.on('chat-rooms', (chatRooms) => {
            this.setState({chatRooms});
        })

        socket.on('update-history', chatHistory => {
            this.setState({chatHistory});
        })

        this.setState({ socket });
    }

    componentWillUnmount() {
        this.state.socket.disconnect();
    }

    sendMessage = (event) => {
        event.preventDefault();

        const newMessage = {
            message: this.state.message.trim(),
            username: this.state.username
        }

        this.state.socket.emit('message', {
            room: this.state.selectedRoom, 
            message: newMessage
        });
        this.setState({ message: '' });
    }

    setMessage = (event) => {
        this.setState({ message: event.target.value });
    }

    turnChatOn = (event) => {
        event.preventDefault();

        if (!this.state.username.trim()) return;

        this.setState({ isChatAvailable: true });
    }

    setUsername = event => {
        this.setState({username: event.target.value});
    }

    selectRoom = event => {
        const selectedRoom = event.target.value;

        this.setState({selectedRoom});

        this.state.socket.emit('join-room', {
            leftRoom: this.state.selectedRoom,
            joinRoom: selectedRoom, 
        });
    }

    render() {
        return (
            <div className={s.chatPage}>
                <h2>Chat Page!</h2>

                <Tabs
                    name="rooms"
                    items={this.state.chatRooms}
                    onChange={this.selectRoom}
                    value={this.state.selectedRoom} />


                <div>
                    {
                        this.state.chatHistory.map(({id, message, username}) =>
                            <Card
                                key={id}
                                username={username}
                                message={message} />)
                    }
                </div>

                {
                    this.state.isChatAvailable ?
                        <div className={s.messageFormWrapper}>
                            <p>{this.state.username}</p>
                            <form onSubmit={this.sendMessage}>
                                <div>
                                    <textarea
                                        className={s.messageInput}
                                        placeholder="Enter your message..."
                                        name="message"
                                        value={this.state.message}
                                        onChange={this.setMessage}
                                        rows="4">
                                    </textarea>
                                </div>

                                <button
                                    type="submit">
                                    Send Message
                                </button>
                            </form>
                        </div> :
                        <div>
                            <form onSubmit={this.turnChatOn}>
                                <label htmlFor="username">Username</label>
                                <input
                                    id="username"
                                    name="username"
                                    placeholder="Enter your username..."
                                    value={this.state.username}
                                    onChange={this.setUsername} />

                                <button type="submit">Enter Chat</button>
                            </form>
                        </div>
                }
            </div>
        )
    }
}

export default Chat;
