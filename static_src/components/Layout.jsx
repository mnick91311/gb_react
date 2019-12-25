import React from 'react'

import Header from './Header'
import ChatList from './ChatList'
import MessageField from './MessageField'
import Profile from './Profile'

import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'

class Layout extends React.Component {
    static defaultProps = {
        chatId: 1,
    }

    render() {
        const chatId = this.props.chatId
        return (
            <div className="layout">
                <div className="header">
                    <Header 
                        title="React Chat"
                        />
                </div>
                <div className="content">
                    <div className="left">
                        <ChatList />
                    </div>
                    <div className="right">
                    { this.props.profile ? (
                        <Profile />
                    ):(
                        <MessageField chatId={ chatId } />
                    )}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({}) => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
