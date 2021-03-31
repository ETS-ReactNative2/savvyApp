import http from '../../helpers/http'

export const chatView = (token) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_CHAT_MESSAGE',
        payload: '',
      })
      const response = await http(token).get('chats')
      dispatch({
        type: 'CHAT_VIEW',
        payload: response.data.results,
      })
    } catch (err) {
      console.log(err)
      const { message } = err.response.data
      dispatch({
        type: 'SET_CHAT_MESSAGE',
        payload: message,
      })
    }
  }
}

export const chatBySender = (token, id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_CHAT_MESSAGE',
        payload: '',
      })
      const response = await http(token).get(`chat/${id}`)
      dispatch({
        type: 'CHAT_SENDER',
        payload: response.data.results,
      })
    } catch (err) {
      console.log(err)
      const { message } = err.response.data
      dispatch({
        type: 'SET_CHAT_MESSAGE',
        payload: message,
      })
    }
  }
}

export const sendChat = (token, message, recipient_id) => {
  return async (dispatch) => {
    const params = new URLSearchParams()
    params.append('message', message)
    params.append('recipient_id', recipient_id)
    try {
      dispatch({
        type: 'SET_CHAT_MESSAGE',
        payload: '',
      })
      const response = await http(token).post('chat', params)
      dispatch({
        type: 'SEND_CHAT',
        payload: response.data.message,
      })
    } catch (err) {
      console.log(err)
      const { message } = err.response.data
      dispatch({
        type: 'SET_CHAT_MESSAGE',
        payload: message,
      })
    }
  }
}

export const senderById = (sender_id) => {
  return async (dispatch) => {
    const params = new URLSearchParams()
    params.append('sender_id', sender_id)
    try {
      dispatch({
        type: 'GET_SENDER_ID',
        payload: sender_id,
      })
    } catch (err) {
      console.log(err)
      const { message } = err.response.data
      dispatch({
        type: 'SET_CHAT_MESSAGE',
        payload: message,
      })
    }
  }
}
