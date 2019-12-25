import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Layout from './Layout'

export default class Router extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={ Layout } />
                <Route exact path='/chat/:chatId/' render={ (obj) => 
                    <Layout chatId={ obj.match.params.chatId } /> } />
                <Route exact path='/profile' component={ () => 
                    <Layout profile={ true } /> } />
            </Switch>
        )
    }
}