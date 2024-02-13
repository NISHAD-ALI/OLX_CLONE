import React, { useState  } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {auth,Firestore} from '../../firebase/config'
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import Logo from '../../olx-logo.png';
import './Signup.css';

export default function Signup() {

  const navigate = useNavigate()
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [password,setPassword] = useState('')
  const [err,setErr] = useState(null)
  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit=(e)=>{

    e.preventDefault()

    if(email && !emailPattern.test(email)){
      setErr('Invalid email format')
      return
    }else if(name && name.length < 4){
      setErr('name must be at least 4 character')
      return
    }else if(phone && phone.length < 10){
      setErr('Phone must be at least 10 character')
      return
    }else if(password && password.length < 6){
      setErr('Password must be at least 6 character')
      return
    }

    createUserWithEmailAndPassword(auth,email,password).then((result)=>{
      const user = result.user;
      updateProfile(user,{displayName:name}).then(()=>{
        const userCollection = collection(Firestore,"users")
        addDoc(userCollection,{
          id:user.uid,
          name:name,
          phone:phone
        })
        .then(()=>{
          navigate('/login')
        })
        
      })
    }).catch((err)=>{
     setErr(err.message)
    })
    
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="280px" height="280px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
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
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={()=>navigate('/login')}>Login</a>
        { err ? <span style={{color:'red'}}>{err}</span> : ''}
      </div>
    </div>
  );
}