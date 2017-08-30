export default function currentUserReducer(
  state = {
    isLoading: false,
    outlets: [],
    name: '',
    email: '',
    password: '',
    birthday: ''
  }, action) {
    switch (action.type) {
      case 'UPDATING_CURRENT_USER':
        return {
          ...state,
          isLoading: true
        }
      case 'UPDATED_CURRENT_USER':

      default:
        return state
    }
  }
