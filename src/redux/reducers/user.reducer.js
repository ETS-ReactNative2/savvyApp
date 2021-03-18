const initialState = {
  userDetail: {},
  checkData: {},
  errorMsg: '',
  message: '',
  dataUser: {},
  chatHistory: [],
  senderChatList: {},
  senderId: '',
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DETAIL_USER': {
      return {
        ...state,
        userDetail: action.payload,
        message: action.message,
      }
    }
    case 'CREATE_DATA_USER': {
      return {
        ...state,
        userData: action.payload,
      }
    }
    case 'CHECK_DATA_USER': {
      return {
        ...state,
        message: action.payload,
      }
    }
    case 'SEND_CHAT': {
      return {
        ...state,
        message: action.payload,
      }
    }
    case 'USER_CHAT_LIST': {
      return {
        ...state,
        chatHistory: action.payload,
      }
    }
    case 'GET_SENDER_ID': {
      return {
        ...state,
        senderId: action.payload,
      }
    }
    case 'SENDER_CHAT_LIST': {
      return {
        ...state,
        senderChatList: action.payload,
      }
    }
    case 'UPDATE_USER': {
      return {
        ...state,
        dataUser: action.payload,
        message: action.message,
        errorMsg: '',
      }
    }
    case 'SET_USER_MESSAGE': {
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

export default userReducer
