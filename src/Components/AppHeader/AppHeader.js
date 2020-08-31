import React from 'react'
import classes from './index.module.css'
const AppHeader = () => {
    return (
        <div className={classes['main-container']}>
            <div className={classes['header']}>
                <div className={classes['logo']}>
                    <h4>
                        2DO
                    </h4>
                </div>
            </div>
        </div>
    )
}

export default AppHeader
