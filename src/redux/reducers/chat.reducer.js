const initialState = {
  errorMsg: '',
  message: '',
  chatHistory: [],
  chatSender: [],
  senderId: '',
}

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEND_CHAT': {
      return {
        ...state,
        message: action.payload,
      }
    }
    case 'GET_SENDER_ID': {
      return {
        ...state,
        senderId: action.payload,
      }
    }
    case 'CHAT_VIEW': {
      return {
        ...state,
        chatHistory: action.payload,
      }
    }
    case 'CHAT_SENDER': {
      return {
        ...state,
        chatSender: action.payload,
      }
    }
    case 'SET_CHAT_MESSAGE': {
      return {
        ...state,
        errorMsg: action.payload,
        message: '',
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}

export default chatReducer
