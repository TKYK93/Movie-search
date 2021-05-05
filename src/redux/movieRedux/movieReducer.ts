import { MovieActions } from './movieActions'
import { Movie, MovieDetail } from '../../models/Movie'


export interface MovieState {
  searchedMovies: Movie[]
  movieDetail: MovieDetail 
}

export const initialState: MovieState = {
  searchedMovies: [],
  movieDetail: {} as MovieDetail
}

export const MovieReducer = (state = initialState, action: MovieActions) => {
  switch (action.type) {
    case 'GET_SEARCHED_MOVIES':
      return { ...state, searchedMovies: action.movies }

    case 'GET_MOVIE_DETAIL':
      return { ...state, movieDetail: action.movieDetail }
      
    default:
      return state
  }
}
