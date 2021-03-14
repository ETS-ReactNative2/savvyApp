const initialState = {
  userDetail: {},
  checkData: {},
  errorMsg: '',
  message: '',
  dataUser: {},
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
