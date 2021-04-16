import http from '../../helpers/http'

export const chatView = (token, page, order) => {
  return async (dispatch) => {
    try {
      const response = await http(token).get(
        `chats?page=${page ? page : 1}&order=${order ? order : 'DESC'}`,
      )
      dispatch({
        type: 'CHAT_VIEW',
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

export const pagingChatView = (token, page, order) => {
  return async (dispatch) => {
    try {
      const response = await http(token).get(
        `chats?page=${page ? page : 1}&order=${order ? order : 'DESC'}`,
      )
      dispatch({
        type: 'PAGING_CHAT_VIEW',
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

export const chatBySender = (token, sender_id, page) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_CHAT_MESSAGE',
      })
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
      dispatch({
        type: 'SET_CHAT_MESSAGE',
        message: '',
      })
      const response = await http(token).post('chats', params)
      dispatch({
        type: 'SEND_CHAT',
        payload: response.data.message,
      })
      const responseChat = await http(token).get(`chat/${recipient_id}`)
      dispatch({
        type: 'CHAT_SENDER',
        payload: responseChat.data.results,
      })
      const responseList = await http(token).get(`chats?order=DESC`)
      dispatch({
        type: 'CHAT_VIEW',
        payload: responseList.data.results,
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

export const sortChat = (sort) => ({
  type: 'SELECT_SORT',
  payload: sort,
})
