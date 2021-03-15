const initialState = {
  userDetail: {},
  checkData: {},
  errorMsg: '',
  message: '',
  dataUser: {},
  chatList: [],
  senderChatList: {},
  messageSendChat: '',
  messageUpdate: '',
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
        messageSendChat: action.payload,
      }
    }
    case 'USER_CHAT_LIST': {
      return {
        ...state,
        chatList: action.payload,
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
        messageUpdate: action.message,
        // userData: action.payload.data,
      }
    }
    case 'SET_USER_MESSAGE': {
      return {
        ...state,
        errorMsg: action.payload,
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
