import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Header from './Header'
import ChatList from './ChatList'
import MessageField from './MessageField'

export default () => (
    <MuiThemeProvider>
        <div className="layout">
            <div className="header">
                <Header />
            </div>
            <div className="content">
                <ChatList />
                <MessageField />
            </div>
        </div>
    </MuiThemeProvider>
);
