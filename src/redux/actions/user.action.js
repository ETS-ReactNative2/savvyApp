import http from '../../helpers/http'

export const getUserDetail = (token, id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: '',
      })
      const response = await http(token).get(`user/${id}`)
      dispatch({
        type: 'DETAIL_USER',
        payload: response.data.results,
        message: response.data.message,
      })
    } catch (err) {
      console.log(err)
      const { message } = err.response.data
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: message,
      })
    }
  }
}

export const getUserData = (email) => {
  return async (dispatch) => {
    const params = new URLSearchParams()
    params.append('email', email)
    try {
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: '',
      })
      dispatch({
        type: 'CREATE_DATA_USER',
        payload: email,
      })
    } catch (err) {
      console.log(err)
      const { message } = err.response.data
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: message,
      })
    }
  }
}
