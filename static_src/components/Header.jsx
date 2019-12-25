import React from 'react'
import AppBar from 'material-ui/AppBar'
import Avatar from 'material-ui/Avatar'
import FlatButton from 'material-ui/FlatButton';
import Contacts from 'material-ui/svg-icons/communication/contacts'
import { Link } from 'react-router-dom'

import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'

const Header = ({title, profile}) => (
    <AppBar
        title={title} 
        iconElementRight={
            <Link to="/profile">
                <FlatButton 
                    label={ profile.name }
                    icon={ <Avatar icon={<Contacts />} /> }
                    />
            </Link>
        }
        />
)

const mapStateToProps = ({ profileReducer }) => ({
    profile: profileReducer.profile,
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Header)
