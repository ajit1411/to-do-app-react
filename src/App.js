import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import AppLayout from './Components/AppLayout';
import Axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
function App() {
  const [content, setcontent] = useState('')
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setcontent(<AppLayout />)
    }
    else {
      setcontent(<Login />)
    }
  }, [])
  const Login = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const signin = () => {
      Axios.post('http://localhost:3000/user/login', {
        userDetails: {
          'email': email,
          'password': password
        }
      }).then(res => {
        localStorage.setItem('accessToken', res.data.jwt)
        console.log(res.data)
        if (res.data.status === 'Authorized User') {
          setcontent(<AppLayout />)
        }
        else {
          setcontent(<span>Please use valid account</span>)
        }
      }).catch(error => {
        console.log(error)
        toast.error('Error while loggin in')
      })
    }

    return (
      <div className={'Login__main-container'}>
        <div className={'header'}>
          <h4>
            2DO | Fractal Project
          </h4>
        </div>
        <div className={'form-group'}>
          <div className={'input__text'}>
            <input value={email} onChange={(e) => setemail(e.target.value)} placeholder={'ajitjadhav2@jadhav.com'} />
          </div>
        </div>
        <div className={'form-group'}>
          <div className={'input__text'}>
            <input value={password} type='password' onChange={(e) => setpassword(e.target.value)} placeholder={'1234'} />
          </div>
        </div>
        <div className={'form-group'}>
          <button onClick={signin} className={'btn btn-success'}>Login</button>
        </div>
      </div>
    )
  }
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
