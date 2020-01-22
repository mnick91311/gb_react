import React, { Component } from 'react'
import Header from './Header'

import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'

import { loadProfile } from '../actions/profileActions'
import CircularProgress from 'material-ui/CircularProgress'

class Profile extends Component {
    componentDidMount() {
        this.props.loadProfile()
    }

    render() {
        const { isLoading, profile } = this.props
        return isLoading ? (
            <CircularProgress />
        ) : (
            <div>
                <h1>Profile</h1>
                <b>Name: </b><span>{ profile.name }</span><br />
                <b>Email: </b><span>{ profile.email }</span><br />
                <b>Phone: </b><span>{ profile.phone }</span><br />
            </div>
        )
    }
}

const mapStateToProps = ({ profileReducer }) => ({
    profile: profileReducer.profile,
    isLoading: profileReducer.isLoading,
})

const mapDispatchToProps = dispatch => bindActionCreators({ loadProfile }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
