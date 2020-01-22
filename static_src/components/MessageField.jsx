import React, { Component } from 'react'

import Message from './Message'
import TextField from './TextField'
import { FloatingActionButton } from './Button'
import SendIcon from 'material-ui/svg-icons/content/send'

import FlatButton from 'material-ui/FlatButton'
import Delete from 'material-ui/svg-icons/action/delete'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import { sendMessage, removeMessage } from '../actions/messageActions'
import { loadChats } from '../actions/chatActions'
import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'

import CircularProgress from 'material-ui/CircularProgress'

class MessageField extends Component {
    state = {
        message: '',
        selected: {},
    }

    messageEndRef = React.createRef()

    componentDidMount() {
        this.props.loadChats()
    }

    componentDidUpdate(prevProps) {
        const { chats, chatId } = this.props
        if (chatId && chats[chatId]) {
            const {chats: prevChats, chatId: prevChatId} = prevProps
            if (prevChatId && prevChats[chatId]) {
                const { messageList } = chats[chatId]
                const prevMessageList = prevChats[chatId].messageList
                if (prevMessageList.length < messageList.length)
                    this.scrollToBottom()
                const { chatId: prevChatId } = prevProps
                if (prevChatId !== chatId) {
                    this.setState({
                        selected: {}
                    })
                }
            }
        }
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

    handleSelect = (id) => {
        const isSelected = !!this.state.selected[id]
        if (isSelected) {
            let selected = Object.assign({}, this.state.selected)	
            delete selected[id]
            this.setState({selected})
        } else {
            this.setState({
                selected: {
                    ...this.state.selected,
                    [id]: true,
                }
            })	
        }
    }

    handleRemove = () => {
        this.props.removeMessage(Object.keys(this.state.selected), this.props.chatId)
        this.setState({selected: {}})
    }

    render() {
        if (this.props.isLoading) {
            return <CircularProgress />
        }
        const { messages, chats, chatId } = this.props
        if (chatId && chats[chatId]) {
            const { messageList } = chats[chatId]
            const messageElements = messageList.map( id => 
                <Message 
                    key={id}
                    {...messages[id]}
                    selected={this.state.selected[id]} 
                    onClick={ () => this.handleSelect(id) }
                    />
            )
            return <div className="message-field">
                <Toolbar>
                    <ToolbarGroup>
                        <FlatButton 
                            onClick={ this.handleRemove }
                            icon={ <Delete /> }
                            />
                    </ToolbarGroup>
                </Toolbar>
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
        } else {
            return <div></div>
        }
    }
}

const mapStateToProps = ({ chatReducer, messageReducer }) => ({
    chats: chatReducer.chats,
    messages: messageReducer.messages,
    isLoading: chatReducer.isLoading
})

const mapDispatchToProps = dispatch => bindActionCreators({ sendMessage, removeMessage, loadChats }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MessageField)
