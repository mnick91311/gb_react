import React, { Component } from 'react'

import Message from './Message'
import TextField from './TextField'
import { FloatingActionButton } from './Button'
import SendIcon from 'material-ui/svg-icons/content/send'

export default class MessageField extends Component {
    state = {
        messages: [
            { id: 0, author: 'Bot', text: "Привет", date: '2019-11-27T22:02:00+03' },
            { id: 1, author: 'Bot', text: "Как дела?", date: '2019-11-27T22:02:03+03' },
        ],
        message: '',
    }

    messageEndRef = React.createRef()

    componentDidUpdate() {
        setTimeout(() => {
            const { messages } = this.state
            if (messages[messages.length-1].author !== "Bot")
                this._sendMessage("Bot", "Не приставай ко мне. я робот!")
        }, 1000)
        this.scrollToBottom()
    }

    scrollToBottom = () => {
        this.messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    _sendMessage(author, text) {
        this.setState({
            messages: [...this.state.messages, {
                id: `f${new Date().getTime().toString(16)}`,
                author: author,
                text: text,
                date: new Date().toISOString(),
            }],
        })
    }

    handleSend = (e) => {
        e.preventDefault()
        this._sendMessage("me", this.state.message)
        this.setState({message: ''})
    }

    handleChange = (e) => {
        this.setState({message: e.target.value})
    }

    render() {
        const messageElements = this.state.messages.map( message => <Message key={message.id} {...message} />)
        return <div className="message-field">
            <div className="message-list-container">
                <div className="message-list">
                    { messageElements }
                    <div ref={this.messageEndRef} />
                </div>
            </div>
            <form className="input-form" onSubmit={ this.handleSend }>
                <TextField fullWidth={true} name="message" type="text" value={ this.state.message } onChange={ this.handleChange } autoFocus />
                <FloatingActionButton type="submit" hint="Отправить сообщение">
                    <SendIcon />
                </FloatingActionButton>
            </form>
        </div>
    }
}
