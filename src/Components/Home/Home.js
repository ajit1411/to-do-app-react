import React, { useEffect, useState } from 'react'
import classes from './index.module.css'
import Tasks from '../Tasks'
import axios from './../../Axios/Axios'
import Urls from '../../Utilities/Urls'

const Home = () => {
    const [myTasks, setmyTasks] = useState([])
    useEffect(() => {
        axios.get(`${Urls.tasks}/my-tasks`)
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
            <Tasks tasks={myTasks} type={'myTasks'} />
        </div>
    )
}

export default Home
