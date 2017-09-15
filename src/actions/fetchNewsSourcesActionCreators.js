const BASE_URL = process.env.REACT_APP_API
const API_KEY = process.env.REACT_APP_API_KEY


export function fetchingSources() {
  return {
    type: 'FETCHING_SOURCES'
  }
}

export function fetchedSources(payload) {
  return function(dispatch) {
    dispatch({type: 'FETCHING_SOURCES'})
    fetch(`${BASE_URL}/sources`)
    .then(resp => resp.json())
    .then(jsonObject => {
      dispatch({
        type: 'FETCHED_SOURCES',
        payload: jsonObject
      })
    })
  }
}

export function fetchedImages() {
  return function(dispatch) {
    fetch(`${BASE_URL}/images`)
    .then(resp => resp.json())
    .then(jsonObject => {
      dispatch({
        type: 'FETCHED_IMAGES',
        payload: jsonObject
      })
    })
  }
}

export function fetchingArticles() {
  return {
    type: 'FETCHING_ARTICLES'
  }
}

export function fetchedArticles(sourceName) {
  return function(dispatch) {
    fetch(`https://newsapi.org/v1/articles?source=${sourceName}&sortBy=top&apiKey=${API_KEY}`)
    .then(resp => resp.json())
    .then(jsonObject => {
      dispatch({
        type: 'FETCHED_ARTICLES',
        payload: jsonObject
      })
    })
  }
}
