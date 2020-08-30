import React, { useEffect, useState } from 'react'
import axios from '../../Axios/Axios'
import Urls from '../../Utilities/Urls'
import classes from './index.module.css'
import Tasks from '../Tasks'

const Bucket = (props) => {
    const [bucketTasks, setbucketTasks] = useState([])
    useEffect(() => {
        console.log(props.history.location)
        axios.get(`${Urls.bucket.url}/${props.match.params.bucketId}`)
            .then(res => {
                // console.clear()
                console.log(res.data)
                setbucketTasks([...res.data.myTasks])
            })
            .catch(error => {
                console.log(error)
            })
    }, [props.match.params.bucketId])
    return (
        <div className={classes['main-container']}>
            <Tasks tasks={bucketTasks} type={props.history.location.state.bucketName} history={props.history} />
        </div>
    )
}

export default Bucket
