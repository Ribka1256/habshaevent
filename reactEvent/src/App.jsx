import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import {Routes, Route} from 'react-router-dom'
import Register from './pages/Register.jsx'
import EventList from './pages/EventList.jsx'
import EventDetail from './pages/EventDetail.jsx'
import CreateEvent from './pages/CreateEvent.jsx'
import EditEvent from './pages/EditEvent.jsx'
import Dashboard from './pages/Dashboard.jsx'
import RequestModal from './components/RequestModal.jsx'
import Profile from './pages/Profile.jsx'


function App() {


  return (
<Routes>
<Route path='/home' element={<Home/>}></Route>
<Route path='/login' element={<Login/>}></Route>
<Route path='/register' element={<Register/>}></Route>
<Route path='/eventlist' element={<EventList/>}></Route>
<Route path='/events/:id' element={<EventDetail/>}></Route>
<Route path='/events/create' element={<CreateEvent />}></Route>
<Route path='/events/:id/edit' element={<EditEvent/>}></Route>
<Route path='/dashboard' element={<Dashboard />}></Route>
<Route path='/profile' element={<Profile />}></Route>
</Routes>
  );
}

export default App
