import AuthAdapter from '../authAdapter'
import history from '../history'

const BASE_URL = process.env.REACT_APP_API


export function login(loginParams) {
  return function(dispatch) {
    console.log('before authadapter')
    AuthAdapter.login(loginParams)
    .then(resp => {
      if (resp.error) {

        console.log('in  login error')
        dispatch({
          type: 'LOGIN_FAILED',
          payload: [resp.error]
        })
      } else {
        console.log('about to login')
        dispatch({
          type: 'LOGIN_USER',
          payload: { id: resp.id, name: resp.name, email: resp.email, outlets: resp.outlets }
        })
        dispatch({
          type: 'CLEAR_LOGIN_ERRORS'
        })
        console.log('bout to set jwt')
        window.localStorage.setItem('jwt', resp.jwt)
        history.push('/dashboard')
        console.log('after redirect')
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

export function userExistFB(data, outlets) {
  return function(dispatch) {
    fetch(`${BASE_URL}/me`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({email: data.profile.email})
    })
    .then(resp => resp.json())
    .then(jsonObject => {
      if (jsonObject.user) {
        const loginParams = { email: jsonObject.user.email, password: data.profile.id }
        AuthAdapter.login(loginParams)
        .then(resp => {
          if (resp.error) {

            console.log('in  login error')
            dispatch({
              type: 'LOGIN_FAILED',
              payload: [resp.error]
            })
          } else {
            console.log('about to login')
            dispatch({
              type: 'LOGIN_USER',
              payload: { id: resp.id, name: resp.name, email: resp.email, outlets: resp.outlets }
            })
            dispatch({
              type: 'CLEAR_LOGIN_ERRORS'
            })
            console.log('bout to set jwt')
            window.localStorage.setItem('jwt', resp.jwt)
            history.push('/dashboard')
            console.log('after redirect')
          }
        })
      } else {
        if (outlets.length === 0) {
            dispatch({
              type: 'OUTLETS_MISSING',
              payload: ['Please choose a minimum of one source below.']
            })
            return
        }
        const signUpParams = { name: data.profile.name, email: data.profile.email, password: data.profile.id, outlets: outlets }
        AuthAdapter.signUp(signUpParams)
        .then(resp => {
          if (resp.errors) {
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
    })
  }
}

export function UserExistGoogle(data) {
  return function(dispatch) {
    fetch(`${BASE_URL}/me`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({email: data.profileObj.email})
    })
    .then(resp => resp.json())
  }
}

export function userExistGoogle(data, outlets) {
  return function(dispatch) {
    fetch(`${BASE_URL}/me`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({email: data.profileObj.email})
    })
    .then(resp => resp.json())
    .then(jsonObject => {
      if (jsonObject.user) {
        const loginParams = { email: jsonObject.user.email, password: data.profileObj.googleId }
        AuthAdapter.login(loginParams)
        .then(resp => {
          if (resp.error) {

            console.log('in  login error')
            dispatch({
              type: 'LOGIN_FAILED',
              payload: [resp.error]
            })
          } else {
            console.log('about to login')
            dispatch({
              type: 'LOGIN_USER',
              payload: { id: resp.id, name: resp.name, email: resp.email, outlets: resp.outlets }
            })
            dispatch({
              type: 'CLEAR_LOGIN_ERRORS'
            })
            console.log('bout to set jwt')
            window.localStorage.setItem('jwt', resp.jwt)
            history.push('/dashboard')
            console.log('after redirect')
          }
        })
      } else {
          if (outlets.length === 0) {
              dispatch({
                type: 'OUTLETS_MISSING',
                payload: ['Please choose a minimum of one source below.']
              })
              return
          }
        const signUpParams = { name: data.profileObj.name, email: data.profileObj.email, password: data.profileObj.googleId, outlets: outlets }
        AuthAdapter.signUp(signUpParams)
        .then(resp => {
          if (resp.errors) {
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
