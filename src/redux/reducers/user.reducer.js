const initialState = {
  detail: {},
  errorMsg: '',
  message: '',
  dataUser: {},
  contact: [],
  recipient: {},
  pageInfoContact: null,
  updateMessage: null,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DETAIL_USER': {
      return {
        ...state,
        detail: action.payload,
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
        updateMessage: action.message,
        errorMsg: '',
      }
    }
    case 'ALL_CONTACT': {
      return {
        ...state,
        contact: action.payload,
        pageInfoContact: action.pageInfo,
      }
    }
    case 'PAGING_CONTACT': {
      const oldData = state.contact
      const newData = [...oldData, ...action.payload]
      return {
        ...state,
        contact: newData,
        pageInfoContact: action.pageInfo,
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
        updateMessage: '',
      }
    }
    case 'SET_UPDATE_MESSAGE': {
      return {
        ...state,
        errorMsg: action.payload,
        message: '',
      }
    }
    case 'SET_USER_DATA_MESSAGE': {
      return {
        ...state,
        errorMsg: action.payload,
        message: '',
      }
    }
    case 'SET_USER_DETAIL_MESSAGE': {
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
