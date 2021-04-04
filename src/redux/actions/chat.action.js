import http from '../../helpers/http'

export const chatView = (token) => {
  return async (dispatch) => {
    try {
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

export const chatBySender = (token, sender_id, page) => {
  return async (dispatch) => {
    try {
      const response = await http(token).get(
        `chat/${sender_id}?page=${page ? page : 1}`,
      )
      dispatch({
        type: 'CHAT_SENDER',
        payload: response.data.results,
        pageInfo: response.data.pageInfo,
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

export const pagingChat = (token, sender_id, page) => {
  return async (dispatch) => {
    try {
      const response = await http(token).get(
        `chat/${sender_id}?page=${page ? page : 1}`,
      )
      dispatch({
        type: 'PAGING_CHAT',
        payload: response.data.results,
        pageInfo: response.data.pageInfo,
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
      const response = await http(token).post('chats', params)
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

export const senderId = (sender) => ({
  type: 'SELECT_SENDER',
  payload: sender,
})
