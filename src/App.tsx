import React from 'react';
import { Routes, Route, Outlet, Link } from "react-router-dom"; 
import { Main } from './features/main/Main';
import { Profiles } from './features/profiles/Profiles';
import './App.css';
import './styles.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>MyFlix</h1>
        <ul className="app-menu">
          <li><Link to="/browse">Browse</Link></li>
        </ul>
      </header>
      <Routes>
        <Route path="/">
          <Route path="/" element={<Profiles />}></Route>
          <Route path="browse" element={<Main />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
