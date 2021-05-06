import { MovieActions } from './movieActions'
import { Movie, MovieDetail } from '../../models/Movie'


export interface MovieState {
  searchedMovies: Movie[]
  movieDetail: MovieDetail
  selectedCountry: string
}

export const initialState: MovieState = {
  searchedMovies: [],
  movieDetail: {} as MovieDetail,
  selectedCountry: "US"
}

export const MovieReducer = (state = initialState, action: MovieActions) => {
  switch (action.type) {
    case 'GET_SEARCHED_MOVIES':
      return { ...state, searchedMovies: action.movies }

    case 'CLEAR_SEARCHED_MOVIES':
      return { ...state, searchedMovies: initialState.searchedMovies }

    case 'GET_MOVIE_DETAIL':
      return { ...state, movieDetail: action.movieDetail }

    case 'CLEAR_MOVIE_DETAIL':
      return { ...state, movieDetail: initialState.movieDetail }

    case 'SET_COUNTRY':
      return { ...state, selectedCountry: action.country }

    default:
      return state
  }
}
