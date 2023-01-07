import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom"
import { auth } from "./config"
import Login from './Pages/Login';
import Profile from './Pages/Profile/Profile';
import Register from "./Pages/Register/Register";
import TeamDetails from './Pages/TeamDetails/TeamDetails';
import EditTeam from './Pages/EditTeam'
import Toolbar from './Components/Toolbar';
import PrivateRoute from './Components/PrivateRoute';
import Home from './Pages/Home/Home';
import Gallery from "./Pages/Gallery/Gallery";

class App extends React.Component {
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem("userDetails", JSON.stringify(user));
      }
    });
  }
  render() {
    return (
      <div className="App">
        <Toolbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route
            path="/profile"
            exact
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/register"
            exact
            element={
              <PrivateRoute>
                <Register />
              </PrivateRoute>
            }
          />
          <Route
            path="/register/:id"
            exact
            element={
              <PrivateRoute>
                <TeamDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-team"
            exact
            element={
              <PrivateRoute>
                <EditTeam />
              </PrivateRoute>
            }
          />
          <Route path="/login" exact element={<Login />} />
          <Route path="/gallery" exact element={<Gallery />} />
        </Routes>
      </div>
    );
  }
}

export default App;
