import React, { useState, useEffect } from 'react'
import { Accordion, Card } from 'react-bootstrap'
import classes from './index.module.css'
import axios from '../../Axios/Axios'
import Urls from '../../Utilities/Urls'
import PopupModal from '../PopupModal/PopupModal'
import { toast } from 'react-toastify'
import { toastConf } from './../../Utilities/Utility'
const Tasks = (props) => {
    const [myTasks, setMyTasks] = useState([])
    const [filteredList, setFilteredList] = useState([])
    useEffect(() => {
        setMyTasks(props.tasks ? props.tasks.map(task => {
            let currentTask = { ...task }
            currentTask['isEditable'] = false
            return currentTask
        }) : [])
        setFilteredList(props.tasks ? props.tasks.map(task => {
            let currentTask = { ...task }
            currentTask['isEditable'] = false
            return currentTask
        }) : [])
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
                let filteredTasks = filteredList.map(task => task)
                const taskCount = allTasks.length
                const filteredTaskCount = filteredTasks.length
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
                for (let i = 0; i < filteredTaskCount; i++) {
                    if (filteredTasks[i]['taskId'] === selectedTask['taskId']) {
                        if (filteredTasks[i]['status'] === 'incomplete') {
                            filteredTasks[i]['status'] = 'completed'
                        }
                        else {
                            filteredTasks[i]['status'] = 'incomplete'
                        }
                        break
                    }
                }
                toast('Task updated', toastConf)
                setMyTasks(allTasks.map(task => task))
                setFilteredList(filteredTasks.map(task => task))
            })
            .catch(error => {
                console.log(error)
                toast.error('Error while processing your request!', toastConf)
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
                toast('Task deleted', toastConf)
            })
            .catch(error => {
                toast.error('Error while processing your request!', toastConf)
                console.log(error)
            })
    }

    // Edit the selected task
    const toggleEdit = (selectedTask, inputType, inputValue) => {
        var taskToUpdate;
        let filteredTasks = [...filteredList]
        let tasks = [...myTasks]
        const filteredListCount = filteredTasks.length
        const taskCount = tasks.length
        for (let i = 0; i < filteredListCount; i++) {
            if (filteredTasks[i]['taskId'] == selectedTask['taskId']) {
                filteredTasks[i][inputType] = inputValue
                taskToUpdate = filteredTasks[i]
                break
            }
        }
        for (let i = 0; i < taskCount; i++) {
            if (tasks[i]['taskId'] == selectedTask['taskId']) {
                tasks[i][inputType] = inputValue
                taskToUpdate = tasks[i]
                break
            }
        }
        if (inputType === 'isEditable' && inputValue === false) {
            axios.post(`${Urls.tasks}/${taskToUpdate['taskId']}`, { 'taskData': taskToUpdate })
                .then(res => {
                    toast('Task updated', toastConf)
                })
                .catch(error => {
                    console.log(error)
                    toast.error('Error while processing your request!', toastConf)
                })
        }
        setMyTasks(tasks.map(task => {
            return task
        }))
        setFilteredList(filteredTasks.map(task => {
            return task
        }))

    }

    // Add new task subcomponent
    const AddNewTask = () => {
        const [taskName, settaskName] = useState('')
        const [dueDate, setdueDate] = useState('')
        const addTask = () => {
            const body = {
                'taskDetails': {
                    'name': taskName,
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
                    document.getElementById(`popup-modal__create-task-modal`).click()
                    toast('Task created', toastConf)
                })
                .catch(error => {
                    toast.error('Error while processing your request!', toastConf)
                    console.log(error)
                    document.getElementById(`popup-modal__create-task-modal`).click()
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
                <div className={`row text-center`} style={{marginTop: '2%'}}>
                    <div className={`col-12`}>
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
                        modalId={'create-task-modal'}
                        toggle={<h4><i className={'fa fa-plus'}></i></h4>}
                        content={<AddNewTask />}
                        header={'Add task'}
                    />
                </div>
            </div>
            <div className={classes['task-list']}>
                {
                    filteredList && filteredList.length > 0 ? (
                        filteredList.map((task, index) =>
                            <div className={classes['task-header']} key={`task-${index + 1}`}>
                                <div className={`row`}>
                                    <div className={`col-1`}>
                                        <div className={isCompleted(task) ? classes['checkbox-selected'] : classes['checkbox']}>
                                            <i onClick={() => updateTaskStatus(task)} className={'fa fa-check-circle-o'}></i>
                                        </div>
                                    </div>
                                    <div className={`col-9 text-left`}>
                                        {
                                            task['isEditable'] ? (
                                                <div className={'input__text'}>
                                                    <input value={task['name']} onChange={(e) => toggleEdit(task, 'name', e.target.value)} />
                                                </div>
                                            ) : (
                                                    <span className={`${classes['task-name']} ${isCompleted(task) ? classes['striked'] : ''}`}>
                                                        {
                                                            task.name
                                                        }
                                                    </span>
                                                )
                                        }
                                    </div>
                                    <div className={`col-1`}>
                                        <div className={classes['actions']}>
                                            {
                                                task['isEditable'] ? (
                                                    <i className={'fa fa-check'} onClick={() => toggleEdit(task, 'isEditable', false)}  ></i>
                                                ) : (
                                                        <i className={'fa fa-pencil'} onClick={() => toggleEdit(task, 'isEditable', true)} ></i>
                                                    )
                                            }
                                        </div>
                                    </div>
                                    <div className={`col-1`}>
                                        <div className={classes['actions']}>
                                            <i className={'fa fa-trash'} onClick={() => deleteTask(task)}></i>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                    ) : (
                            <span>No tasks</span>
                        )
                }
            </div>
        </React.Fragment >
    )
}

export default Tasks
