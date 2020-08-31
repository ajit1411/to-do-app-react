import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import AppLayout from './Components/AppLayout';
import Axios from 'axios'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
function App() {
  const [content, setcontent] = useState(<h3>Loading...</h3>)
  useEffect(() => {
    Axios.post('http://localhost:3000/user/login', {
      userDetails: {
        'email': 'ajitjadhav2@jadhav.com',
        'password': '1234'
      }
    }).then(res => {
      localStorage.setItem('accessToken', res.data.jwt)
      console.log(res.data)
      if(res.data.status === 'Authorized User'){
        setcontent(<AppLayout />)
      }
      else{
        setcontent(<span>Please use valid account</span>)
      }
    }).catch(error => {
      console.log(error)
    })
  }, [])
  return (
    <div className="App">
      <ToastContainer />
      {
        content
      }
    </div>
  );
}

export default App;
