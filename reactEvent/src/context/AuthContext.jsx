import { createContext, useState, useContext, useEffect } from 'react';
import { loginUser, getMe } from '../api/auth';


const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
  const [loading, setLoading] = useState(true);


const login = async (username, password) => {
  const res = await loginUser(username, password);
  localStorage.setItem('access_token', res.data.access);
  localStorage.setItem('refresh_token', res.data.refresh);
  setAccessToken(res.data.access);
};

const logout = () =>{
   localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setAccessToken(null);
    setUser(null);
}
useEffect(() =>{
  const token = localStorage.getItem('access_token');
  if(token){
    getMe()
    .then((res) => setUser(res.data))
    .catch((err) => {logout(); console.error('Failed to fetch user:', err)})
    .finally(() => setLoading(false));
  }
  else{
    setLoading(false);
  }

},[])

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);