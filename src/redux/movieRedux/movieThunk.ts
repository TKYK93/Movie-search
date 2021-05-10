import { ThunkAction } from 'redux-thunk'
import { RootReducer } from '../store'
import { Action } from 'redux'
import { movieAxios } from '../../axios'
import { Movie, MovieDetail } from '../../models/Movie'
import { getMovieDetail, getMovieEpisodes, getMovieSeasons, getSearchedMovies } from './movieActions'

export const getSearchedMoviesFromAPI = (searchWord: string): ThunkAction<void, RootReducer, unknown, Action<string>> => async (dispatch) => {
  movieAxios
  .get(`/search/shows?q=${searchWord}`)
  .then((res) => {
    if (res.data.length === 0) {
      console.log("No data available")
      return void 0
    } else {
      let tempArray: Movie[] = []
      res.data.forEach((movieInfo: any) => {
        const movieData: Movie = {
          id: movieInfo.show.id,
          title: movieInfo.show.name,
          image: movieInfo.show.image?.original || undefined,
          summary: movieInfo.show.summary || "No summary",
          detailUrl: movieInfo.show.url
        }
        tempArray.push(movieData)
      })
      dispatch(getSearchedMovies(tempArray))
    }
  })
  .catch((err) => console.log(err))
}

export const getSingleSearchedMovieFromAPI = (searchWord: string): ThunkAction<void, RootReducer, unknown, Action<string>> => async (dispatch) => {
  movieAxios
  .get(`/singlesearch/shows?q=${searchWord}&embed=seasons`)
  .then((res) => {
    if (res.data.length === 0) {
      console.log("No data available")
      return void 0
    } else {
      let tempArray: Movie[] = []
      res.data._embedded.seasons.forEach((movieInfo: any) => {
        const movieData: Movie = {
          id: movieInfo.id,
          title: res.data.name + movieInfo.number,
          image: movieInfo.image?.original || undefined,
          seasonNumber: movieInfo.number,
          episodeNumber: movieInfo.episodeOrder,
          summary: movieInfo.summary || "No summary",
          detailUrl: movieInfo.url
        }
        tempArray.push(movieData)
      })
      dispatch(getSearchedMovies(tempArray))
    }
  })
  .catch((err) => console.log(err))
}

export const getMovieDetailFromAPI = (movieId: number): ThunkAction<void, RootReducer, unknown, Action<string>> => async (dispatch) => {
  movieAxios
  .get(`/shows/${movieId}?embed[]=seasons&embed[]=episodes`)
  .then((res) => {
    if (!res.data) {
      console.log("No data available")
      return void 0
    } else {
      const detailInfo:MovieDetail = {
        id: res.data.id,
        image: res.data.image.medium || undefined ,
        title: res.data.name,
        seasonNumber: res.data._embedded.seasons.length || "N/A", 
        episodeNumber: res.data._embedded.episodes.length || "N/A", 
        summary: res.data.summary || "No summary",
        detailUrl: res.data.url,
        genres: res.data.genres,
        rating: res.data.rating.average,
      }
      let tempArray: Movie[] = []
      res.data._embedded.seasons.forEach((movieInfo: any) => {
        const movieData: Movie = {
          id: movieInfo.id,
          title: movieInfo.name,
          image: movieInfo.image?.original || undefined,
          summary: movieInfo.summary || "No summary",
          seasonNumber: movieInfo.number,
          detailUrl: movieInfo.url
        }
        tempArray.push(movieData)
      })
      dispatch(getMovieDetail(detailInfo))
      dispatch(getMovieSeasons(tempArray))
      }
  })
  .catch((err) => console.log(err))
}

export const getEpisodesFromAPI = (seasonId: number): ThunkAction<Promise<any>, RootReducer, unknown, Action<string>> => async (dispatch) => {
  return movieAxios
  .get(`/seasons/${seasonId}/episodes`)
  .then((res) => {
    if (!res.data) {
      console.log("No data available")
      return void 0
    } else {
      let tempArray: Movie[] = []
      res.data.forEach((movieInfo: any) => {
        const movieData: Movie = {
          id: movieInfo.id,
          title: movieInfo.name,
          image: movieInfo.image?.original || undefined,
          summary: movieInfo.summary || "No summary",
          seasonNumber: movieInfo.season,
          episodeNumber: movieInfo.number,
          detailUrl: movieInfo.url
        }
        tempArray.push(movieData)
      })
      dispatch(getMovieEpisodes(tempArray))
    }
  })
  .catch((err) => console.log(err))
}



