import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom"
import { auth } from "./config"
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Register from "./Pages/Register";
import TeamDetails from './Pages/TeamDetails';

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
        <Route path="/profile" exact element={<Profile />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/register/:id" exact element={<TeamDetails />} />
        <Route path="/" exact element={<Login />} />
      </Routes>
    </div>
  );
  }
}

export default App;
