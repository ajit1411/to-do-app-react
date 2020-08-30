import React, { useEffect, useState } from 'react'
import classes from './index.module.css'
import Tasks from '../Tasks'
import axios from './../../Axios/Axios'
import Urls from '../../Utilities/Urls'

const Home = () => {
    const [myTasks, setmyTasks] = useState([])
    useEffect(() => {
        axios.get(Urls.tasks.get)
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
            {
                myTasks && myTasks.length > 0 ? (
                    <Tasks tasks={myTasks} type={'myTasks'} />
                ) : (
                    <span>No Tasks</span>
                )
            }
        </div>
    )
}

export default Home
