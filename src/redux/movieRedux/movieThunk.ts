import { ThunkAction } from 'redux-thunk'
import { RootReducer } from '../store'
import { Action } from 'redux'
import { movieAxios } from '../../axios'
import { Movie, MovieDetail } from '../../models/Movie'
import { getMovieDetail, getSearchedMovies } from './movieActions'


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
        console.log("movieInfo",movieInfo)
        const movieData: Movie = {
          id: movieInfo.show.id,
          title: movieInfo.show.name,
          image: movieInfo.show.image.original || "no image",
          seasonNumber: movieInfo.show.season,
          episodeNumber: movieInfo.show.number,
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

export const getMovieDetailFromAPI = (movieId: number): ThunkAction<void, RootReducer, unknown, Action<string>> => async (dispatch) => {
  movieAxios
  .get(`/shows/${movieId}`)
  .then((res) => {
    if (!res.data) {
      console.log("No data available")
      return void 0
    } else {
      const detailInfo:MovieDetail = {
        id: res.data.id,
        image: res.data.image.original ,
        title: res.data.name,
        seasonNumber: res.data.season || "N/A", 
        episodeNumber: res.data.seasonNumber || "N/A", 
        summary: res.data.summary,
        detailUrl: res.data.url,
        genres: res.data.genres,
        rating: res.data.rating.average,
      }
      dispatch(getMovieDetail(detailInfo))
    
    }
  })
  .catch((err) => console.log(err))
}

