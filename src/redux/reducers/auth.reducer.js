const initialState = {
  token: null,
  errorMsg: '',
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        token: action.payload,
        id: action.id,
      }
    }
    case 'LOGOUT': {
      return {
        ...state,
        token: null,
        message: '',
        errorMsg: '',
      }
    }
    case 'REGISTER': {
      return {
        ...state,
        message: action.payload,
      }
    }
    case 'UPDATE_USER': {
      return {
        ...state,
        message: action.payload,
        // userData: action.payload.data,
        // errorMsg; action.payload.message
      }
    }
    case 'SET_AUTH_MESSAGE': {
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

export default authReducer
