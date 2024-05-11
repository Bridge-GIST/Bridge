import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import { TestForm } from './test'
import { LoginForm, SignupForm } from './account'
import { UserProvider } from './UserContext';
import { MainScreenForm } from './mainScreen';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className='App'>
          <Routes>
            <Route path="/" element={<TestForm />} />
            <Route path='/login' element={<LoginForm/>} />
            <Route path='/signup' element={<SignupForm/>} />
            <Route path='/mainscreen' element={<MainScreenForm/>} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App
