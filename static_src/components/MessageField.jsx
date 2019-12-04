import React, { Component } from 'react'

import Message from './Message'

export default class MessageField extends Component {
    state = {
        messages: [
            { id: 0, author: 'User', text: "Привет", date: '2019-11-27T22:02:00+03' },
            { id: 1, author: 'User', text: "Как дела?", date: '2019-11-27T22:02:03+03' },
        ],
        message: '',
    }

    componentDidUpdate() {
        setTimeout(() => {
            const { messages } = this.state
            if (messages[messages.length-1].author !== "Bot")
                this._sendMessage("Bot", "Не приставай ко мне. я робот!")
        }, 1000)
    }

    _sendMessage(author, text) {
        this.setState({
            messages: [...this.state.messages, {
                id: `f${new Date().getTime().toString(16)}`,
                author: author,
                text: text,
                date: new Date().toISOString(),
            }]
        })
    }

    handleSend = () => {
        this._sendMessage("User", "Нормально")
    }

    render() {
        const messageElements = this.state.messages.map( message => <Message key={message.id} {...message} />)
        return <>
            <h2>React Chat</h2>
            <div>
                { messageElements }
            </div>
            <button onClick={ this.handleSend }>Отправить сообщение</button>
        </>
    }
}