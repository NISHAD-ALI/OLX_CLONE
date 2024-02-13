import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import {AuthContext} from './store/FirebaseContext'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import Post from './store/PostContext'
import Home from './Pages/Home';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import View from './Pages/ViewPost'
import ViewPost from './Pages/ViewPost';
function App() {

  const {setUser} = useContext(AuthContext)

  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      setUser(user)
    })
  },[])

  return (
    <div>
      <Router>
          <Post>
        <Routes>
          <Route exact path="/" element={<Home />} /> 
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={<Create />} />
          <Route path='/view' element={<View />}/>
          <Route path='/post' element={<ViewPost />}/>
        </Routes>
          </Post>
      </Router>
    </div>
  );
}

export default App;
