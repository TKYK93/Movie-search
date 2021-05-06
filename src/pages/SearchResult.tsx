import { Grid, IconButton, makeStyles } from "@material-ui/core"
import { ArrowBackIosOutlined } from "@material-ui/icons"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import Header from "../components/Header"
import MovieCard from "../components/MovieCard"
import { clearSearchedMovies } from "../redux/movieRedux/movieActions"
import { AppState } from "../redux/store"

const useStyles = makeStyles({
  searchMoviesWrapper: {
    padding: "0 3%",
  },
  movieCardWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
})

const SearchedResult: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const searchedMoviesList = useSelector(
    (state: AppState) => state.movieState.searchedMovies
  )

  const backButtonHandler = () => {
    dispatch(clearSearchedMovies())
    history.replace("/home")
  }

  return (
    <div className="SearchResult">
      <Header title="Search Result" />
      {searchedMoviesList.length > 0 ? (
        <div className={classes.searchMoviesWrapper}>
          <IconButton edge="start" onClick={() => backButtonHandler()}>
            <ArrowBackIosOutlined />
            back to home
          </IconButton>
          <h3>Search Result</h3>
          <Grid container justify="center" spacing={3}>
            {searchedMoviesList.map((searchedMovie, index) => (
              <Grid key={index} item xs={12} sm={6} md={4}>
                <MovieCard {...searchedMovie} purpose="detail" />
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
        <div>No Result</div>
      )}
    </div>
  )
}

export default SearchedResult
