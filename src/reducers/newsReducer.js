

export default function newsReducer(
  state = {
    isLoading: false,
    sources: [],
    images: [],
    articles: []
  }, action) {
    switch (action.type) {
      case 'FETCHING_SOURCES':
        return {
          ...state,
          isLoading: true,
        }
      case 'FETCHED_SOURCES':
        return {
          ...state,
          isLoading: false,
          sources: action.payload
        }
      case 'FETCHED_IMAGES':
        return {
          ...state,
          images: action.payload
        }
      case 'FETCHING_ARTICLES':
        return {
          ...state,
          isLoading: true
        }
      case 'FETCHED_ARTICLES':
      // debugger
        return {
          ...state,
          articles: [...state.articles, action.payload]
        }
      default:
        return state
    }
  }
