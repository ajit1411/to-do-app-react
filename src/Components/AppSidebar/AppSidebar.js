import React from 'react'
import classes from './index.module.css'
import { withRouter } from 'react-router-dom'

const AppSidebar = (props) => {
    const Nav = ({ text, path, icon }) => {
        const isSelected = function(){
            if(window.location.href.includes(path)){
                return true
            }
            return false
        }
        return (
            <div onClick={() => props.history.push({ pathname: path })} className={isSelected() ? classes['navlink-selected'] : classes['navlink']}>
                <b className={classes['icon']}>
                    <i className={icon}></i>
                </b>
                <b className={classes['text']}>
                    {text}
                </b>
            </div>
        )
    }
    return (
        <div className={classes['main-container']}>
            <div className={classes['menu']}>
                <div className={classes['menu-header']}>
                    <h3>
                        Your tasks
                    </h3>
                    <div className={'horizontal-line'}></div>
                </div>
                <div className={classes['menu-item']}>
                    <Nav text={'My Tasks'} path={'/my-tasks'} icon={'fa fa-tasks'} />
                    <Nav text={'Important'} path={'/important'} icon={'fa fa-star'} />
                    <Nav text={'Completed'} path={'/completed'} icon={'fa fa-check-square-o'} />
                </div>
            </div>
        </div>
    )
}

export default withRouter(AppSidebar)
