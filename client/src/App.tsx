import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import SignIn from './components/SignIn/Signin';
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import TaskInfo from './components/TaskInfo/TaskInfo';
import NotFound from './components/NotFound/NotFound';
import './App.css';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Main/> } />
        <Route path="/regestration" element={<SignIn/> } />
        <Route path="/login" element={<Login/> } />
        <Route path="*" element={<NotFound/>} />
        <Route path="/task/:id" element={<TaskInfo />} />
      </Routes>
      <div></div>
    </div>
  );
}

export default App;
