export default function newsReducer(
  state = {
    isLoading: false,
    name: '',
    email: '',
    password: '',
    birthday: '',
    outlets: [],

  }, action) {
    switch (action.type) {
      case 'UPDATING_CURRENT_USER':
        return {
          isLoading: true,
          ...state
        }
      case 'UPDATED_CURRENT_USER':
        return {
          isLoading: false,
          name: action.payload.name,
          email: action.payload.email,
          password: action.payload.password,
          birthday: action.payload.birthday,
          outlets: action.payload.outlets
        }
      default:
        return state
    }
  }
