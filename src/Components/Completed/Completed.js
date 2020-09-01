import React, { useEffect, useState } from 'react'
import classes from './index.module.css'
import Tasks from '../Tasks'
import axios from './../../Axios/Axios'
import Urls from '../../Utilities/Urls'
import Loader from '../Loader'
import { toast } from 'react-toastify'

const Completed = () => {
    const [myTasks, setmyTasks] = useState([])
    const [isLoading, setisLoading] = useState(false)
    useEffect(() => {
        setisLoading(true)
        axios.get(`${Urls.tasks}?type=completed`)
            .then(res => {
                console.log(res.data)
                setisLoading(false)
                setmyTasks(res.data.myTasks)
            })
            .catch(error => {
                console.log(error)
                toast.error('Error while processing your request')
                setisLoading(false)
            })
    }, [])
    return (
        <React.Fragment>
            <Loader isLoading={isLoading} />
            <div className={classes['main-container']}>
                <Tasks tasks={myTasks} type={'Completed'} />
            </div>
        </React.Fragment>
    )
}

export default Completed
