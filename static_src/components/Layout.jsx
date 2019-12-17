import React from 'react'

import Header from './Header'
import ChatList from './ChatList'
import MessageField from './MessageField'

export default class Layout extends React.Component {
    static defaultProps = {
        chatId: 1,
    }

    state = {
        messages: {
            0: { author: 'Bot', text: "Привет", date: '2019-11-27T22:02:00+03' },
            1: { author: 'Bot', text: "Как дела?", date: '2019-11-27T22:02:03+03' },
        },
        chats: {
            1: { title: "Чат 1", messageList: [0, 1]},
            2: { title: "Чат 2", messageList: []},
            3: { title: "Чат 3", messageList: []},
        },
    }

    _sendMessage = (author, text, toChatId) => {
        const id = `f${new Date().getTime().toString(16)}`
        const chatId = toChatId || this.props.chatId
        this.setState({
            chats: {
                ...this.state.chats,
                [chatId]: {
                    ...this.state.chats[chatId],
                    messageList: [
                        ...this.state.chats[chatId].messageList,
                        id
                    ],
                },
            },
            messages: {
                ...this.state.messages, 
                [id]: {
                    author: author,
                    text: text,
                    date: new Date().toISOString(),
                },
            },
        })
    }

    _addChat = (title) => {
        const id = `f${new Date().getTime().toString(16)}`
        this.setState({
            chats: {
                ...this.state.chats,
                [id]: {
                    title,
                    messageList: []
                }
            }
        })
    }

    render() {
        const chatId = this.props.chatId
        return (
            <div className="layout">
                <div className="header">
                    <Header 
                        title={`${this.state.chats[chatId].title} #${chatId}`}
                        />
                </div>
                <div className="content">
                    <ChatList 
                        chatId={ chatId }
                        chats={ this.state.chats }
                        addChat={ this._addChat }
                        />
                    <MessageField 
                        chatId={ chatId }
                        messages={ this.state.messages }
                        messageList={ this.state.chats[this.props.chatId].messageList }
                        sendMessage={ this._sendMessage }
                        />
                </div>
            </div>
        )
    }
}
