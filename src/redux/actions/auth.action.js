import AsyncStorage from '@react-native-async-storage/async-storage'
import http from '../../helpers/http'

export const login = (email, password) => {
  return async (dispatch) => {
    const params = new URLSearchParams()
    params.append('email', email)
    params.append('password', password)
    try {
      const results = await http().post('auth/login', params)
      AsyncStorage.setItem('token', results.data.token)
      dispatch({
        type: 'LOGIN',
        payload: results.data.token,
      })
    } catch (err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: message,
      })
    }
  }
}

export const register = (data) => {
  return async (dispatch) => {
    const params = new URLSearchParams()
    if (data.email) {
      params.append('email', data.email)
    }
    if (data.phoneNumber) {
      params.append('phoneNumber', data.phoneNumber)
    }
    if (data.fullName) {
      params.append('fullName', data.fullName)
    }
    if (data.password) {
      params.append('password', data.password)
    }
    try {
      const response = await http().post('auth/register', params)
      dispatch({
        type: 'REGISTER',
        payload: response.data.message,
      })
    } catch (err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: message,
      })
    }
  }
}

export const autoLogin = (payload) => ({
  type: 'LOGIN',
  payload,
})

export const logout = () => ({
  type: 'LOGOUT',
})
