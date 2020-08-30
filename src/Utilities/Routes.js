import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './../Components/Home'
import Bucket from './../Components/Bucket'
import Completed from './../Components/Completed'
import Important from './../Components/Important'
const Routes = () => {
    return (
        <Switch>
            <Redirect exact={true} path={'/'} to={'/my-tasks'} />
            <Route exact={true} path={'/my-tasks'} component={Home} />
            <Route path={'/bucket/:bucketId'} component={Bucket} />
            <Route path={'/bucket'} component={Bucket} />
            <Route exact={true} path={'/completed'} component={Completed} />
            <Route exact={true} path={'/important'} component={Important} />
        </Switch>
    )
}

export default Routes
