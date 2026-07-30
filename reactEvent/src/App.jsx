import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import {Routes, Route} from 'react-router-dom'
import Register from './pages/Register.jsx'
import EventList from './pages/EventList.jsx'


function App() {


  return (
<Routes>
<Route path='/' element={<Home/>}></Route>
<Route path='/login' element={<Login/>}></Route>
<Route path='/register' element={<Register/>}></Route>
<Route path='/Eventlist' element={<EventList/>}></Route>
</Routes>
  );
}

export default App
