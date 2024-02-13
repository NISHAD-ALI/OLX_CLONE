import React, { useState } from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../../firebase/config'
import Logo from '../../olx-logo.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate()
  const [email,setEmail] = useState(null)
  const [password,setPassword] = useState(null)
  const [err,setErr] = useState(null)
  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const submitHandler = (e)=>{

    e.preventDefault()

    if(email && !emailPattern.test(email)){
      setErr('Invalid email format')
      return
    }else if(password && password.length < 4){
      setErr('Password must be at least 4 character')
      return
    }

    signInWithEmailAndPassword(auth,email,password).then(()=>{
      navigate('/')
    }).catch((err)=>{
      setErr('user not found')
    })

  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="280px" height="280px" src={Logo}></img>
        <form onSubmit={submitHandler}>
      { err ? <span style={{color:'red'}}>{err}</span> : ''}
      <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={()=>navigate('/signup')}>Signup</a>
      </div>
    </div>
  );
}

export default Login;