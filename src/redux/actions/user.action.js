import http from '../../helpers/http'

export const getUserDetail = (token) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: '',
      })
      const response = await http(token).get(`user`)
      dispatch({
        type: 'DETAIL_USER',
        payload: response.data.results,
        message: response.data.message,
      })
    } catch (err) {
      console.log(err)
      const { message } = err.response.data
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: message,
      })
    }
  }
}

export const getUserData = (data) => {
  return async (dispatch) => {
    const params = new URLSearchParams()
    if (data.phoneNumber) {
      params.append('phoneNumber', data.phoneNumber)
    }
    if (data.email) {
      params.append('email', data.email)
    }
    try {
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: '',
      })
      dispatch({
        type: 'CREATE_DATA_USER',
        payload: data,
      })
    } catch (err) {
      console.log(err)
      const { message } = err.response.data
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: message,
      })
    }
  }
}

export const checkData = (data) => {
  return async (dispatch) => {
    const params = new URLSearchParams()
    if (data.email) {
      params.append('email', data.email)
    }
    if (data.phoneNumber) {
      params.append('phoneNumber', data.phoneNumber)
    }
    try {
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: '',
      })
      const response = await http().post('auth', params)
      dispatch({
        type: 'CHECK_DATA_USER',
        payload: response.data.message,
      })
    } catch (err) {
      console.log(err)
      const { message } = err.response.data
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: message,
      })
    }
  }
}

export const updateUser = (token, data) => {
  return async (dispatch) => {
    const params = new FormData()
    if (data.picture) {
      params.append('picture', data.picture)
    }
    if (data.fullName) {
      params.append('fullName', data.fullName)
    }
    if (data.email) {
      params.append('email', data.email)
    }
    if (data.phoneNumber) {
      params.append('phoneNumber', data.phoneNumber)
    }
    if (data.password) {
      params.append('password', data.password)
    }
    try {
      const response = await http(token).patch(`user`, params)
      dispatch({
        type: 'UPDATE_USER',
        payload: response.data.results,
        message: response.data.message,
      })
    } catch (err) {
      console.log(err)
      const { message } = err.response.data
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: message,
      })
    }
  }
}

export const getChatList = (token, recipient_id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: '',
      })
      const response = await http(token).get(`chat/${recipient_id}`)
      dispatch({
        type: 'USER_CHAT_LIST',
        payload: response.data.results,
      })
    } catch (err) {
      console.log(err)
      const { message } = err.response.data
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: message,
      })
    }
  }
}

export const getAllUser = (token) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: '',
      })
      const response = await http(token).get('/users')
      dispatch({
        type: 'USER_CHAT_LIST',
        payload: response.data.results,
      })
    } catch (err) {
      console.log(err)
      const { message } = err.response.data
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: message,
      })
    }
  }
}

export const chatView = (token, recipient_id, sender_id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: '',
      })
      const response = await http(token).get(
        `chat/${recipient_id}/${sender_id}`,
      )
      dispatch({
        type: 'SENDER_CHAT_LIST',
        payload: response.data.results,
      })
    } catch (err) {
      console.log(err)
      const { message } = err.response.data
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: message,
      })
    }
  }
}

export const sendChat = (token, recipient_id, sender_id, message) => {
  return async (dispatch) => {
    const params = new URLSearchParams()
    params.append('message', message)
    try {
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: '',
      })
      const response = await http(token).post(
        `chat/${recipient_id}/${sender_id}`,
        params,
      )
      dispatch({
        type: 'SEND_CHAT',
        payload: response.data.message,
      })
    } catch (err) {
      console.log(err)
      const { message } = err.response.data
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: message,
      })
    }
  }
}

export const getSenderById = (sender_id) => {
  return async (dispatch) => {
    const params = new URLSearchParams()
    params.append('sender_id', sender_id.toString())
    try {
      dispatch({
        type: 'GET_SENDER_ID',
        payload: sender_id,
      })
    } catch (err) {
      console.log(err)
      const { message } = err.response.data
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: message,
      })
    }
  }
}
