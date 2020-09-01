import React, { useEffect, useState } from 'react'
import classes from './index.module.css'
import Tasks from '../Tasks'
import axios from './../../Axios/Axios'
import Urls from '../../Utilities/Urls'
import { toast } from 'react-toastify'
import Loader from './../Loader'
const Home = () => {
    const [myTasks, setmyTasks] = useState([])
    const [isLoading, setisLoading] = useState(false)
    useEffect(() => {
        setisLoading(true)
        axios.get(`${Urls.tasks}/my-tasks`)
            .then(res => {
                console.log(res.data)
                setmyTasks(res.data.myTasks)
                setisLoading(false)
            })
            .catch(error => {
                console.log(error)
                toast.error('Error while processing your request!')
                setisLoading(false)
            })
    }, [])
    return (
        <React.Fragment>
            <Loader isLoading={isLoading} />
            <div className={classes['main-container']}>
                <Tasks tasks={myTasks} type={'myTasks'} />
            </div>
        </React.Fragment>
    )
}

export default Home
