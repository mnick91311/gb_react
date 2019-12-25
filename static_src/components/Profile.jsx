import React from 'react'
import Header from './Header'

import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'

const Profile = ({profile}) => <div>
    <h1>Profile</h1>
    <b>Name: </b><span>{ profile.name }</span><br />
    <b>Email: </b><span>{ profile.email }</span><br />
    <b>Phone: </b><span>{ profile.phone }</span><br />
</div>

const mapStateToProps = ({ profileReducer }) => ({
    profile: profileReducer.profile,
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
