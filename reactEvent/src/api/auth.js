import api from './axios'

export const loginUser = (username, password,email) =>{
    return api.post('accounts/token/', { username, password })
}
export const registerUser = (userData) =>{
    return api.post('accounts/register/', userData)
}
export const refreshToken = (refresh) =>{
    return api.post('accounts/token/register', {refresh})
}