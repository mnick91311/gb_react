import React, { Component } from 'react'

import Message from './Message'
import TextField from './TextField'
import { FloatingActionButton } from './Button'
import SendIcon from 'material-ui/svg-icons/content/send'

export default class MessageField extends Component {
    static defaultProps = {
        chatId: 1
    }

    state = {
        message: '',
    }

    messageEndRef = React.createRef()

    componentDidUpdate(prevProps) {
        const { messages: prevMessages } = prevProps
        const { chatId, messages, messageList } = this.props
        const lastMessageId = messageList[messageList.length - 1]
        if (lastMessageId &&
            Object.keys(prevMessages) < Object.keys(messages) &&
            messages[lastMessageId].author !== "Bot")
            setTimeout(() => {
                this.props.sendMessage("Bot", "Не приставай ко мне. я робот!", chatId)
            }, 1000)
        this.scrollToBottom()
    }

    scrollToBottom = () => {
        this.messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }


    handleSend = (e) => {
        e.preventDefault()
        this.props.sendMessage("me", this.state.message)
        this.setState({message: ''})
    }

    handleChange = (e) => {
        this.setState({message: e.target.value})
    }

    render() {
        const { messages, messageList } = this.props
        const messageElements = messageList.map( id => <Message key={id} {...messages[id]} />)
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
