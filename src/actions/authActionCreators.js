import AuthAdapter from '../authAdapter'
import history from '../history'


export function login(loginParams) {
  return function(dispatch) {
    AuthAdapter.login(loginParams)
    .then(resp => {
      if (resp.error) {
        console.log(resp)
        dispatch({
          type: 'LOGIN_FAILED',
          payload: [resp.error]
        })
      } else {
        dispatch({
          type: 'LOGIN_USER',
          payload: { id: resp.id, name: resp.name, email: resp.email, outlets: resp.outlets }
        })
        dispatch({
          type: 'CLEAR_LOGIN_ERRORS'
        })
        window.localStorage.setItem('jwt', resp.jwt)
        history.push('/dashboard')
      }
    })
  }
}

export function logout() {
  return function(dispatch) {
    window.localStorage.clear()
    dispatch({
      type: 'LOGOUT_USER'
    })
  }
}

export function signUp(signUpParams) {
  return function(dispatch) {
    AuthAdapter.signUp(signUpParams)
    .then(resp => {
      if (resp.errors) {
        debugger
        dispatch({
          type: 'SIGNUP_FAILED',
          payload: resp.errors
        })
      } else {
        dispatch({
          type: 'LOGIN_USER',
          payload: { id: resp.id, name: resp.name, email: resp.email, outlets: resp.outlets}
        })
        dispatch({
          type: 'CLEAR_LOGIN_ERRORS'
        })
        window.localStorage.setItem('jwt', resp.jwt)
        history.push('/dashboard')
      }
    })
  }
}

export function clearErrors() {
  return {
    type: 'CLEAR_LOGIN_ERRORS',
  }
}

export function getCurrentUser() {
  return function(dispatch) {
    AuthAdapter.currentUser()
    .then(resp => {
      dispatch({
        type: 'UPDATED_CURRENT_USER',
        payload: {id: resp.id, name: resp.name, email: resp.email, outlets: resp.outlets}
      })
    })
  }
}

export function outletsNeededErrorMessage() {
  return function(dispatch) {
    dispatch({
      type: 'OUTLETS_MISSING',
      payload: ['Please choose a minimum of one source below.']
    })
  }
}


//
//
// export function signingupActionCreator() {
//   return {
//     type: 'UPDATING_CURRENT_USER'
//   }
// }
//
// export function signedUpActionCreator(payload) {
//   return {
//     type: 'UPDATED_CURRENT_USER',
//     payload: payload
//   }
// }
