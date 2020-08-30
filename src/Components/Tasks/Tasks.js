import React, { useState, useEffect } from 'react'
import { Accordion, Card } from 'react-bootstrap'
import classes from './index.module.css'
import axios from '../../Axios/Axios'
import Urls from '../../Utilities/Urls'
import PopupModal from '../PopupModal/PopupModal'

const Tasks = (props) => {
    const [myTasks, setMyTasks] = useState([])
    const [filteredList, setFilteredList] = useState([])
    useEffect(() => {
        setMyTasks(props.tasks ? props.tasks : [])
        setFilteredList(props.tasks ? props.tasks : [])
        // 
    }, [props && props.tasks])
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
        axios.post(`${Urls.tasks}/${taskToUpdate['taskId']}`, body)
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

    // filter tasks
    const filterTasks = (event) => {
        let filterText = event.target.value
        if (filterText === '') {
            setFilteredList(myTasks)
        }
        else {
            setFilteredList(myTasks.filter(task => {
                if (task['name'].toLowerCase().includes(filterText.toLowerCase())) {
                    return task
                }
            }))
        }
    }

    const deleteTask = (task) => {
        axios.delete(`${Urls.tasks}/${task['taskId']}`)
            .then(res => {
                setFilteredList(filteredList.filter(item => {
                    if (task['taskId'] != item['taskId']) {
                        return item
                    }
                }))
                setMyTasks(myTasks.filter(item => {
                    if (task['taskId'] != item['taskId']) {
                        return item
                    }
                }))
            })
            .catch(error => {
                console.log(error)
            })
    }

    // Add new task subcomponent
    const AddNewTask = () => {
        const [taskName, settaskName] = useState('')
        const [taskDescription, settaskDescription] = useState('')
        const [dueDate, setdueDate] = useState('')
        const addTask = () => {
            const body = {
                'taskDetails': {
                    'name': taskName,
                    'description': taskDescription,
                    'parent': props.history && props.history.location ? [{ 'bucketId': props.history.location.state.bucketId }] : [],
                    'status': 'incomplete',
                    'createdOn': new Date().toISOString(),
                    'type': window.location.href.includes('important') ? 'important' : 'general'
                }
            }
            axios.post(`${Urls.tasks}/new`, body)
                .then(res => {
                    console.log(res.data)
                    setFilteredList([body['taskDetails'], ...filteredList])
                    setMyTasks([body['taskDetails'], ...myTasks])
                })
                .catch(error => {
                    console.log(error)
                })
        }
        return (
            <div className={classes['new-task']}>
                <div className={`row`}>
                    <div className={`col-8`}>
                        <div className={'input__text'}>
                            <label>Name:</label>
                            <input onChange={(e) => settaskName(e.target.value)} placeholder={'Task Name'} type='text' />
                        </div>
                    </div>
                    <div className={`col-4`}>
                        <div className={`input__text`}>
                            <label>Due Date:</label>
                            <input onChange={(e) => setdueDate(e.target.value)} type='date' title={'Due date'} />
                        </div>
                    </div>
                </div>
                <div className={`row`}>
                    <div className={`col-12`}>
                        <div className={'input__textarea'}>
                            <label>Description:</label>
                            <textarea onChange={(e) => settaskDescription(e.target.value)} rows={'5'} placeholder={'Description'} maxLength={'1000'} />
                        </div>
                    </div>
                    <div className={`col-4`}>
                        <button onClick={addTask} className={'btn btn-primary'}>
                            Create task
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <React.Fragment>
            <div className={classes['header']}>
                <div className={classes['title']}>
                    <h4>
                        {props.type}
                    </h4>
                </div>
                <div className={classes['search']}>
                    <input onChange={filterTasks} placeholder={'Filter list by task name'} />
                </div>
                <div className={classes['add']}>
                    <PopupModal
                        toggle={<h4><i className={'fa fa-plus'}></i></h4>}
                        content={<AddNewTask />}
                        header={'Add task'}
                    />
                </div>
            </div>
            <div className={classes['task-list']}>
                <Accordion>
                    {
                        filteredList && filteredList.length > 0 ? (
                            filteredList.map((task, index) =>
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
                                                    <i className={'fa fa-trash'} onClick={() => deleteTask(task)}></i>
                                                </div>
                                            </div>
                                        </div>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey={`task-${index}`}>
                                        <Card.Body className={classes['task-content']}>
                                            <div className={classes['description']}>
                                                <b>
                                                    Created on {new Date(task['createdOn']).toUTCString()}
                                                </b><br />
                                                <span>
                                                    {
                                                        task.description
                                                    }
                                                </span>
                                            </div>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </div>)
                        ) : (
                                <span>No tasks</span>
                            )
                    }
                </Accordion>
            </div>
        </React.Fragment >
    )
}

export default Tasks
