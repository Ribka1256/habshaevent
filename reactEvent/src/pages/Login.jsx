import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import '../style/style.css'
function Login() {
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState(null);
const navigate = useNavigate();
  const { login } = useAuth();
const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
        await login(username, password)
        navigate('/');
    }
    catch(err){
        setError('Invalid username or password');
    }
}

    return(
        <div className="container">
        <div className="layout__box">
          <div className="layout__boxHeader">
            <div className="layout__boxTitle">
              <h3>Login</h3>
            </div>
          </div>
          <div className="layout__body">

            <form className="form" action="" >
                   <div className="form__group form__group">
                <label htmlFor="room_name" >UserName</label>
                <input id="username" name="username" type="text" onChange={(e) => setUsername(e.target.value)} placeholder="dennis_ivy" />
              </div>
              <div className="form__group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                />
              </div>
{error && <p style={{ color: 'red' }}>{error}</p>}
              <button className="btn btn--main" type="submit" onClick={handleSubmit}>
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                >
                  <title>lock</title>
                  <path
                    d="M27 12h-1v-2c0-5.514-4.486-10-10-10s-10 4.486-10 10v2h-1c-0.553 0-1 0.447-1 1v18c0 0.553 0.447 1 1 1h22c0.553 0 1-0.447 1-1v-18c0-0.553-0.447-1-1-1zM8 10c0-4.411 3.589-8 8-8s8 3.589 8 8v2h-16v-2zM26 30h-20v-16h20v16z"
                  ></path>
                  <path
                    d="M15 21.694v4.306h2v-4.306c0.587-0.348 1-0.961 1-1.694 0-1.105-0.895-2-2-2s-2 0.895-2 2c0 0.732 0.413 1.345 1 1.694z"
                  ></path>
                </svg>

                Login
              </button>
            </form>

            <div className="auth__action">
              <p>Haven't signed up yet?</p>
              
<Link to="/register" className="btn btn--link">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    )
}
export default Login;