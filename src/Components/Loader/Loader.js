import React from 'react'
import classes from './index.module.css'
const Loader = ({ isLoading, message }) => {
    return (
        <div className={classes['main-container']}>
            {
                isLoading ? (
                    <div className={classes['loader']}>
                        <i className={'fa fa-spinner fa-spin'}></i>
                    </div>
                ) : (
                        null
                    )
            }
        </div>
    )
}

export default Loader
