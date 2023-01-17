import React from 'react';
import { Routes, Route, Outlet, Link } from "react-router-dom"; 
import { Main } from './features/main/Main';
import { Profile } from './features/profile/Profile';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>MyFlix</h1>
        <ul className="app-menu">
          <li><Link to="/main">Main</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </header>
      <Routes>
        <Route path="/">
          <Route path="profile" element={<Profile />}></Route>
          <Route path="main" element={<Main />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
