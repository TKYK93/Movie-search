import { Movie, MovieDetail } from "../../models/Movie"
import { ActionType } from "../types"

  export const getSearchedMovies = (movies: Movie[]) =>
  ({
    type: 'GET_SEARCHED_MOVIES',
    movies,
  } as const)

  export const clearSearchedMovies = () =>
  ({
    type: 'CLEAR_SEARCHED_MOVIES',
  } as const)

  export const getMovieDetail = (movieDetail: MovieDetail) =>
  ({
    type: 'GET_MOVIE_DETAIL',
    movieDetail,
  } as const)

  export const clearMovieDetail = () =>
  ({
    type: 'CLEAR_MOVIE_DETAIL',
  } as const)

  export const getMovieSeasons = (movieSeasons: Movie[]) =>
  ({
    type: 'GET_MOVIE_SEASONS',
    movieSeasons,
  } as const)

  export const clearMovieSeasons = () =>
  ({
    type: 'CLEAR_MOVIE_SEASONS',
  } as const)

  export const getMovieEpisodes = (movieEpisodes: Movie[]) =>
  ({
    type: 'GET_MOVIE_EPISODES',
    movieEpisodes,
  } as const)

  export const clearMovieEpisodes = () =>
  ({
    type: 'CLEAR_MOVIE_EPISODES',
  } as const)

  export const setCountry = (country: string) =>
  ({
    type: 'SET_COUNTRY',
    country
  } as const)

export type MovieActions = 
  ActionType<typeof getSearchedMovies> 
| ActionType<typeof clearSearchedMovies> 
| ActionType<typeof getMovieDetail> 
| ActionType<typeof clearMovieDetail>
| ActionType<typeof getMovieSeasons>
| ActionType<typeof clearMovieSeasons>
| ActionType<typeof getMovieEpisodes>
| ActionType<typeof clearMovieEpisodes>
| ActionType<typeof setCountry>