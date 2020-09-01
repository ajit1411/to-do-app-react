import React, { useEffect, useState } from 'react'
import axios from '../../Axios/Axios'
import Urls from '../../Utilities/Urls'
import classes from './index.module.css'
import Tasks from '../Tasks'
import Loader from '../Loader'

const Bucket = (props) => {
    const [bucketTasks, setbucketTasks] = useState([])
    const [isLoading, setisLoading] = useState(false)
    useEffect(() => {
        console.log(props.history.location)
        setisLoading(true)
        axios.get(`${Urls.bucket.url}/${props.match.params.bucketId}`)
            .then(res => {
                // console.clear()
                console.log(res.data)
                setbucketTasks([...res.data.myTasks])
                setisLoading(false)
            })
            .catch(error => {
                console.log(error)
                setisLoading(false)
            })
    }, [props.match.params.bucketId])
    return (
        <React.Fragment>
            <Loader isLoading={isLoading} />
            <div className={classes['main-container']}>
                <Tasks tasks={bucketTasks} type={props.history.location.state.bucketName} history={props.history} />
            </div>
        </React.Fragment >
    )
}

export default Bucket
