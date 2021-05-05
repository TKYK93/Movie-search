import { Movie, MovieDetail } from "../../models/Movie"
import { ActionType } from "../types"

export const getSearchedMovies = (movies: Movie[]) =>
  ({
    type: 'GET_SEARCHED_MOVIES',
    movies,
  } as const)

  export const getMovieDetail = (movieDetail: MovieDetail) =>
  ({
    type: 'GET_MOVIE_DETAIL',
    movieDetail,
  } as const)


export type MovieActions = ActionType<typeof getSearchedMovies> | ActionType<typeof getMovieDetail>