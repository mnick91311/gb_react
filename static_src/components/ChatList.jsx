import React from 'react'
import { Link } from 'react-router-dom'
import { List, ListItem } from 'material-ui/List'
import ContentSend from 'material-ui/svg-icons/content/send'
import TextField from './TextField'

import { addChat } from '../actions/chatActions'
import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'

class ChatList extends React.Component {
    static defaultProps = {
        chats: {}
    }

    state = {
        input: '',
    }

    handleChange = (e) => {
        this.setState({
            input: e.target.value
        })
    }

    handleAddChat = (e) => {
        e.preventDefault()
        this.props.addChat(this.state.input)
        this.setState({input: ''})
    }

    render() {
        const listElements = Object.keys(this.props.chats).map( id => (
            <Link to={`/chat/${id}`} key={id} >
                <ListItem
                    primaryText={ this.props.chats[id].title }
                    leftIcon={<ContentSend />}
                    />
            </Link>
        ))
        return (
            <div className="chat-list">
                <List>
                    { listElements }
                </List>
                <form onSubmit={ this.handleAddChat } >
                    <TextField 
                        name="newChatTitle"
                        type="text"
                        fullWidth
                        placeholder="New chat title"
                        value={ this.state.input }
                        onChange={ this.handleChange }
                        />
                </form>
            </div>
        )
    }
}

const mapStateToProps = ({ chatReducer }) => ({
    chats: chatReducer.chats,
})

const mapDispatchToProps = dispatch => bindActionCreators({ addChat }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ChatList)
