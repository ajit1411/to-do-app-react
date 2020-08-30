import React, { useEffect, useState } from 'react'
import classes from './index.module.css'
import Tasks from '../Tasks'
import axios from './../../Axios/Axios'
import Urls from '../../Utilities/Urls'

const Completed = () => {
    const [myTasks, setmyTasks] = useState([])
    useEffect(() => {
        axios.get(`${Urls.tasks}?type=important`)
            .then(res => {
                console.log(res.data)
                setmyTasks(res.data.myTasks)
            })
            .catch(error => {
                console.log(error)
                alert('Error')
            })
    }, [])
    return (
        <div className={classes['main-container']}>
            <Tasks tasks={myTasks} type={'Important'} />
        </div>
    )
}

export default Completed
