import React, { useEffect, useState } from 'react'
import classes from './index.module.css'
import { withRouter } from 'react-router-dom'
import axios from './../../Axios/Axios'
import Urls from './../../Utilities/Urls'
const AppSidebar = (props) => {
    const [buckets, setbuckets] = useState([])
    useEffect(() => {
        axios.get(`${Urls.tasks}/my-tasks`)
            .then(res => {
                console.log(res.data.myBuckets)
                setbuckets(res.data.myBuckets)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])
    const Nav = ({ text, path, icon, bucketId }) => {

        // Check is navlink is selected or not
        const isSelected = function () {
            if (window.location.href.includes(path)) {
                return true
            }
            return false
        }

        // Navigate to the selected screen 
        const goToScreen = (path, bucketId) => {
            props.history.push(
                {
                    'pathname': `${path}`,
                    'state': {
                        'bucketName': text,
                        'bucketId': bucketId
                    }

                }
            )
        }

        // Delete the selected task bucket
        const deleteBucket = (bucketId) => {
            axios.delete(`${Urls.bucket.url}/${bucketId}`)
                .then(res => {
                    setbuckets(buckets.filter(bucket => {
                        if (bucket['bucketId'] != bucketId) {
                            return bucket
                        }
                    }))
                })
                .catch(error => {
                    console.log(error)
                })
        }

        return (
            <div className={isSelected() ? classes['navlink-selected'] : classes['navlink']}>
                <b className={classes['icon']}>
                    <i className={icon}></i>
                </b>
                <b onClick={() => goToScreen(path, bucketId)} className={classes['text']}>
                    {text}
                </b>
                {
                    bucketId ? (
                        <b onClick={() => deleteBucket(bucketId)} className={`${classes['icon']} ${classes['bucket-icon']}`}>
                            <i className={`fa fa-trash`}></i>
                        </b>
                    ) : (
                            <></>
                        )
                }
            </div>
        )
    }
    // Bucket
    const NewBucket = () => {
        const [bucketName, setBucketName] = useState('')
        const createBucket = () => {
            const body = {
                'bucketDetails': {
                    'name': bucketName
                }
            }
            axios.post(`${Urls.bucket.url}/new`, body)
                .then(res => {
                    console.log(res.data)
                    setBucketName('')
                    setbuckets([...buckets, res.data.bucketData])
                })
                .catch(error => {
                    console.log(error)
                })
        }
        return (
            <div className={classes['new-bucket']}>
                <div className={'input__text white-text'}>
                    <input value={bucketName} placeholder={'New bucket?'} onChange={(e) => setBucketName(e.target.value)} />
                    <i className={'fa fa-plus'} onClick={createBucket}></i>
                </div>
            </div>
        )
    }
    return (
        <div className={classes['main-container']}>
            <div className={classes['menu']}>
                <div className={classes['menu-header']}>
                    <h5>
                        Your tasks
                    </h5>
                    <div className={'horizontal-line'}></div>
                </div>
                <div className={classes['menu-item']}>
                    <Nav text={'My Tasks'} path={'/my-tasks'} icon={'fa fa-tasks'} />
                    <Nav text={'Important'} path={'/important'} icon={'fa fa-star'} />
                    <Nav text={'Completed'} path={'/completed'} icon={'fa fa-check-square-o'} />
                </div>
                <div className={classes['menu-header']}>
                    <h5>
                        Categories
                    </h5>
                    <div className={'horizontal-line'}></div>
                </div>
                <div className={classes['user-buckets']}>
                    {
                        buckets && buckets.length > 0 ? (
                            buckets.map(bucket => (
                                <Nav text={bucket['name']} path={`/bucket/${bucket['bucketId'].toLowerCase().replace(/ /g, '-')}`} icon={'fa fa-check'} bucketId={bucket['bucketId']} />
                            ))
                        ) : ''
                    }
                </div>
                <NewBucket />
            </div>
        </div>
    )
}

export default withRouter(AppSidebar)
