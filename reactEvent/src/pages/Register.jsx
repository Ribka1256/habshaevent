import '../style/style.css'
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { registerUser } from '../api/auth';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [error, setError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      await registerUser({
        username,
        email,
        password,
        is_organizer: isOrganizer,
      });
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Username or email may already be taken.');
    }
  };

  return (
    <main className="auth layout">
      <div className="container">
        <div className="layout__box">
          <div className="layout__boxHeader">
            <div className="layout__boxTitle">
              <h3>Sign up</h3>
            </div>
          </div>
          <div className="layout__body">
            <form className="form" onSubmit={handleSubmit}>
              <div className="form__group form__group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="e.g. dennis_ivy"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="form__group form__group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="e.g. dennis_ivy"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form__group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form__group">
                <label htmlFor="confirm_password">Confirm Password</label>
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <label>
                <input
                  type="checkbox"
                  checked={isOrganizer}
                  onChange={(e) => setIsOrganizer(e.target.checked)}
                />
                Sign up as an organizer
              </label>

              {error && <p style={{ color: 'red' }}>{error}</p>}

              <button className="btn btn--main" type="submit">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                >
                  <title>lock</title>
                  <path d="M27 12h-1v-2c0-5.514-4.486-10-10-10s-10 4.486-10 10v2h-1c-0.553 0-1 0.447-1 1v18c0 0.553 0.447 1 1 1h22c0.553 0 1-0.447 1-1v-18c0-0.553-0.447-1-1-1zM8 10c0-4.411 3.589-8 8-8s8 3.589 8 8v2h-16v-2zM26 30h-20v-16h20v16z"></path>
                  <path d="M15 21.694v4.306h2v-4.306c0.587-0.348 1-0.961 1-1.694 0-1.105-0.895-2-2-2s-2 0.895-2 2c0 0.732 0.413 1.345 1 1.694z"></path>
                </svg>
                Sign Up
              </button>
            </form>

            <div className="auth__action">
              <p>Already have an account?</p>
              <Link to="/login" className="btn btn--link">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;