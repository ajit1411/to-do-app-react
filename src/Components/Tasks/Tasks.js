import React, { useState, useEffect } from 'react'
import { Accordion, Card } from 'react-bootstrap'
import classes from './index.module.css'
import axios from '../../Axios/Axios'
import Urls from '../../Utilities/Urls'
const Tasks = ({ tasks = [], type }) => {
    const [myTasks, setMyTasks] = useState(tasks)
    useEffect(() => {
        console.log(tasks)
    }, [])
    // check if the task has status == completed
    // if yes, return true otherwise false
    const isCompleted = function (task) {
        if (task['status'] == 'completed') {
            return true
        }
        return false
    }
    const updateTaskStatus = (selectedTask) => {
        let taskToUpdate = { ...selectedTask }
        taskToUpdate['status'] = taskToUpdate['status'] === 'incomplete' ? 'completed' : 'incomplete';
        let body = {
            'taskData': taskToUpdate
        }
        axios.post(`${Urls.tasks.post}/${taskToUpdate['taskId']}`, body)
            .then(res => {
                let allTasks = myTasks.map(task => task)
                const taskCount = allTasks.length
                for (let i = 0; i < taskCount; i++) {
                    if (allTasks[i]['taskId'] === selectedTask['taskId']) {
                        if (allTasks[i]['status'] === 'incomplete') {
                            allTasks[i]['status'] = 'completed'
                        }
                        else {
                            allTasks[i]['status'] = 'incomplete'
                        }
                        break
                    }
                }
                setMyTasks(allTasks.map(task => task))
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <React.Fragment>
            <div className={classes['header']}>
                <div className={classes['title']}>
                    <h4>
                        My Tasks
                    </h4>
                </div>
                <div className={classes['search']}>
                    <input />
                </div>
                <div className={classes['add']}>
                    <h4>
                        <i className={'fa fa-plus'}></i>
                    </h4>
                </div>
            </div>
            <div className={classes['task-list']}>
                <Accordion>
                    {
                        myTasks.map((task, index) =>
                            <div className={classes['task']} key={`task-${index + 1}`}>
                                <Accordion.Toggle as={Card.Header} className={classes['task-header']} eventKey={`task-${index}`}>
                                    <div className={`row`}>
                                        <div className={`col-1`}>
                                            <div className={isCompleted(task) ? classes['checkbox-selected'] : classes['checkbox']}>
                                                <i onClick={() => updateTaskStatus(task)} className={'fa fa-check-circle-o'}></i>
                                            </div>
                                        </div>
                                        <div className={`col-9 text-left`}>
                                            <span className={classes['task-name']}>
                                                {
                                                    task.name
                                                }
                                            </span>
                                        </div>
                                        <div className={`col-2`}>
                                            <div className={classes['actions']}>
                                                <i className={'fa fa-list'}></i>
                                            </div>
                                        </div>
                                    </div>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey={`task-${index}`}>
                                    <Card.Body className={classes['task-content']}>
                                        <div className={classes['description']}>
                                            <h6>
                                                Description
                                            </h6>
                                            <span>
                                                {
                                                    task.description
                                                }
                                            </span>
                                        </div>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </div>)
                    }
                </Accordion>
            </div>
        </React.Fragment >
    )
}

export default Tasks
