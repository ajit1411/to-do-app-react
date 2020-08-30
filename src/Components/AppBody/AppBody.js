import React from 'react'
import Routes from './../../Utilities/Routes'
import AppSidebar from './../AppSidebar'
import classes from './AppBody.module.css'
const AppBody = () => {
    return (
        <React.Fragment>
            <div className={classes['app-body']}>
                <div className={classes['sidebar']}>
                    <AppSidebar />
                </div>
                <div className={classes['app-wizard']}>
                    <Routes />
                </div>
            </div>
        </React.Fragment>
    )
}

export default AppBody
