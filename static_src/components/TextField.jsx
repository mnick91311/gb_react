import React, { Component } from 'react'
import MuiTextField from 'material-ui/TextField'

export default class TextField extends Component {
    render() {
        return <MuiTextField {...this.props} />
    }
}
