import React, { useEffect, useState } from 'react'
import classes from './index.module.css'
import Tasks from '../Tasks'
import axios from './../../Axios/Axios'
import Urls from '../../Utilities/Urls'
import Loader from './../Loader'
const Completed = () => {
    const [myTasks, setmyTasks] = useState([])
    const [isLoading, setisLoading] = useState(false)
    useEffect(() => {
        setisLoading(true)
        axios.get(`${Urls.tasks}?type=important`)
            .then(res => {
                console.log(res.data)
                setmyTasks(res.data.myTasks)
                setisLoading(false)
            })
            .catch(error => {
                console.log(error)
                setisLoading(false)
            })
    }, [])
    return (
        <React.Fragment>
            <Loader isLoading={isLoading} />
            <div className={classes['main-container']}>
                <Tasks tasks={myTasks} type={'Important'} />
            </div>
        </React.Fragment>
    )
}

export default Completed
