
export default function authReducer(
  state = {
    IsLoading: false,
    isLoggedIn: false,
    currentUser: {
      id: '',
      name: '',
      email: '',
      outlets: ''
    },
    errors: [],
    loggingIn: false,
  }, action) {
    switch (action.type) {
      case 'LOGIN_USER':
        return {
          ...state,
          isLoggedIn: true,
          currentUser: {
            id: action.payload.id,
            name: action.payload.name,
            email: action.payload.email,
            outlets: action.payload.outlets
          }
        }
      case 'LOGOUT_USER':
        return {
          ...state,
          isLoggedIn: false,
          currentUser: {}
        }
      case 'LOGIN_FAILED':
        return {
          ...state,
          loggingIn: false,
          errors: [action.payload]
        }
      case 'LOGGING_IN':
        return {
          ...state,
          loggingIn: true,
          errors: []
        }
      case 'CLEAR_LOGIN_ERRORS':
        return {
          ...state,
          errors: []
        }
      case 'SET_CURRENT_USER':
        return {
          ...state,
          isLoggedIn: true,
          currentUser: {
            id: action.payload.id,
            name: action.payload.name,
            outlets: action.payload.outlets,
          }
        }
        case 'SIGNUP_FAILED':
          return {
            ...state,
            loggingIn: false,
            errors: [action.payload]
          }
          case 'OUTLETS_MISSING':
            return {
              ...state,
              loggingIn: false,
              errors: [action.payload]
            }
      default:
      return state
    }
  }
