import React from 'react'
import AppBar from 'material-ui/AppBar'
import Avatar from 'material-ui/Avatar'
import Contacts from 'material-ui/svg-icons/communication/contacts'
import { Link } from 'react-router-dom'

export default ({title}) => (
    <AppBar
        title={title} 
        iconElementRight={
            <Link to="/profile">
                <Avatar icon={<Contacts />} />
            </Link>
        }
        />
)
