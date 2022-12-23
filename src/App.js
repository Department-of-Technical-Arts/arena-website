import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom"
import { auth } from "./config"
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Home from './Pages/Dashboard/Home';

class App extends React.Component {
  componentDidMount () {
    auth.onAuthStateChanged(user => {
      if (user) {
        localStorage.setItem("userDetails", JSON.stringify(user))
      }
    })
  }
  render () {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Home />} />
      </Routes>
    </div>
  );
  }
}

export default App;
