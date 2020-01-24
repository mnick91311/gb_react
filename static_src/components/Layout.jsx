import React from 'react'

import Header from './Header'
import ChatList from './ChatList'
import MessageField from './MessageField'
import Profile from './Profile'

import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'

import Drawer from 'material-ui/Drawer'

import InstallPopup from './InstallPopup'

class Layout extends React.Component {
    state = {
        drawerIsOpen: false
    }

    handleToggleDrawer = () => {
        this.setState({
            drawerIsOpen: !this.state.drawerIsOpen
        })
    }

    render() {
        let {chats, chatId} = this.props
        if (!chatId || !chats[chatId]) {
            chatId = Object.keys(chats)[0]
        }
        return (
            <div className="layout">
                <InstallPopup />
                <div className="header">
                    <Header
                        title="React Chat"
                        onToggleDrawer={ this.handleToggleDrawer }
                        />
                </div>
                <div className="content">
                    <div className="left" style={{
                            width: this.state.drawerIsOpen ? '256px' : '0px',
                            transition: 'width 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
                        }}>
                        <Drawer ref={ this.drawerRef } open={this.state.drawerIsOpen} containerStyle={{
                                position: 'absolute',
                                width: 256,
                                height: '100%',
                                transition: 'transform 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
                            }}>
                            <ChatList />
                        </Drawer>
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

const mapStateToProps = ({chatReducer}) => ({
    chats: chatReducer.chats
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
