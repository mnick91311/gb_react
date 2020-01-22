import React from 'react'
import { List, ListItem } from 'material-ui/List'
import ContentSend from 'material-ui/svg-icons/content/send'
import IconButton from 'material-ui/IconButton'
import Delete from 'material-ui/svg-icons/action/delete'
import TextField from './TextField'
import { addChat, removeChat } from '../actions/chatActions'
import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'
import { push } from 'connected-react-router'

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

    handleNavigate = link => {
        this.props.push(link)
    }

    handleRemove = (id) => {
        this.props.removeChat(id)
    }

    render() {
        const listElements = Object.keys(this.props.chats).map( id => (
            <ListItem
                key={id}
                style={{
                    transition: '0.3s linear',
                    backgroundColor: this.props.chats[id].timeoutId ? 'gray' : 'transparent'
                }}
                primaryText={ this.props.chats[id].title }
                leftIcon={<ContentSend />}
                rightIconButton={
                    <IconButton onClick={ () => this.handleRemove(id) }>
                        <Delete />
                    </IconButton>
                }
                onClick={ () => this.handleNavigate(`/chat/${id}`) }
                />
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

const mapDispatchToProps = dispatch => bindActionCreators({ addChat, removeChat, push }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ChatList)
