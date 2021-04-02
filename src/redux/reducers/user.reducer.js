const initialState = {
  userDetail: {},
  errorMsg: '',
  message: '',
  dataUser: {},
  contact: [],
  recipient: {},
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
    case 'UPDATE_USER': {
      return {
        ...state,
        dataUser: action.payload,
        message: action.message,
        errorMsg: '',
      }
    }
    case 'ALL_CONTACT': {
      return {
        ...state,
        contact: action.payload,
      }
    }
    case 'RECIPIENT_DETAIL': {
      return {
        ...state,
        recipient: action.payload,
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
