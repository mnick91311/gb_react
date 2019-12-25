import React, { Component } from 'react'

import Message from './Message'
import TextField from './TextField'
import { FloatingActionButton } from './Button'
import SendIcon from 'material-ui/svg-icons/content/send'

import { sendMessage } from '../actions/messageActions'
import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'

class MessageField extends Component {
    static defaultProps = {
        chatId: 1
    }

    state = {
        message: '',
    }

    messageEndRef = React.createRef()

    componentDidUpdate(prevProps) {
        const { messages: prevMessages } = prevProps
        const { chatId, messages, chats } = this.props
        const { messageList } = chats[chatId]
        const lastMessageId = messageList[messageList.length - 1]
        if (lastMessageId &&
            Object.keys(prevMessages) < Object.keys(messages) &&
            messages[lastMessageId].author != "Bot") {
            setTimeout(() => {
                this._sendMessage("Bot", "Не приставай ко мне. я робот!", chatId)
            }, 1000)
        }
        this.scrollToBottom()
    }

    scrollToBottom = () => {
        this.messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    _sendMessage = (author, text, toChatId) => {
        const id = `f${new Date().getTime().toString(16)}`
        const chatId = toChatId || this.props.chatId
        this.props.sendMessage(id, text, author, chatId)
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
        const { messages, chats, chatId } = this.props
        const { messageList } = chats[chatId]
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

const mapStateToProps = ({ chatReducer, messageReducer }) => ({
    chats: chatReducer.chats,
    messages: messageReducer.messages,
})

const mapDispatchToProps = dispatch => bindActionCreators({ sendMessage }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MessageField)
