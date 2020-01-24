import React from 'react'
import AppBar from 'material-ui/AppBar'
import Avatar from 'material-ui/Avatar'
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import Contacts from 'material-ui/svg-icons/communication/contacts'
import { push } from 'connected-react-router'

import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import PushToggle from '../components/PushToggle';

const Header = ({title, profile, onToggleDrawer, push}) => (
    <AppBar
        title={title} 
        iconElementLeft={
            <IconButton>
                <NavigationMenu />
            </IconButton>
        }
        onLeftIconButtonClick={ onToggleDrawer }
        iconElementRight={
            <div>
                <IconButton>
                    <PushToggle />
                </IconButton>
                <IconButton onClick={ () => {
                        push('/profile')
                    }}>
                    <Contacts color='white' />
                </IconButton>
            </div>
        }
        />
)

const mapStateToProps = ({ profileReducer }) => ({
    profile: profileReducer.profile,
})

const mapDispatchToProps = dispatch => bindActionCreators({push}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Header)
