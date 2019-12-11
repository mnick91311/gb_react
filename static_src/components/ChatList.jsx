import React from 'react'
import {List, ListItem} from 'material-ui/List';

export default () => (
    <div className="chat-list">
        <List>
            <ListItem primaryText="Chat 1" />
            <ListItem primaryText="Chat 2" />
            <ListItem primaryText="Chat 3" />
            <ListItem primaryText="Chat 4" />
            <ListItem primaryText="Chat 5" />
        </List>
    </div>
)
