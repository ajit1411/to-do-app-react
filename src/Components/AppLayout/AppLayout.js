import React from 'react'
import AppHeader from './../AppHeader'
import AppBody from './../AppBody'
import { BrowserRouter } from 'react-router-dom'
const AppLayout = () => {
    return (
        <BrowserRouter>
            <AppHeader />
            <AppBody />
        </BrowserRouter>
    )
}

export default AppLayout
