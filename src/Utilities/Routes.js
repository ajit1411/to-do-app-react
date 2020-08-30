import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './../Components/Home'
const Routes = () => {
    return (
        <Switch>
            <Redirect exact={true} path={'/'} to={'/my-tasks'} />
            <Route exact={true} path={'/my-tasks'} component={Home} />
        </Switch>
    )
}

export default Routes
