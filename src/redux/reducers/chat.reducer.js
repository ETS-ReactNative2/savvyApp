const initialState = {
  errorMsg: '',
  message: '',
  chatHistory: [],
  chatSender: [],
  sender: null,
  pageInfoChat: [],
}

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEND_CHAT': {
      return {
        ...state,
        message: action.payload,
      }
    }
    case 'SELECT_SENDER': {
      return {
        ...state,
        sender: action.payload,
        chatSender: '',
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
        pageInfoChat: action.pageInfo,
      }
    }
    case 'PAGING_CHAT': {
      const oldData = state.chatSender
      const newData = [...oldData, ...action.payload]
      return {
        ...state,
        chatSender: newData,
        pageInfoChat: action.pageInfo,
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
