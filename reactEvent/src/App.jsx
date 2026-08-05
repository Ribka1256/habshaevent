import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import EventList from './pages/EventList.jsx'
import EventDetail from './pages/EventDetail.jsx'
import CreateEvent from './pages/CreateEvent.jsx'
import EditEvent from './pages/EditEvent.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Profile from './pages/Profile.jsx'
import NavBar from './components/NavBar.jsx'

function App() {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register'];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <NavBar />}
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/eventlist' element={<EventList />}></Route>
        <Route path='/events/:id' element={<EventDetail />}></Route>
        <Route path='/events/create' element={<CreateEvent />}></Route>
        <Route path='/events/:id/edit' element={<EditEvent />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
      </Routes>
    </>
  );
}

export default App