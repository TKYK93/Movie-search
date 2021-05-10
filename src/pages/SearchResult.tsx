import { Grid, IconButton, makeStyles } from "@material-ui/core"
import { ArrowBackIosOutlined } from "@material-ui/icons"
import React, { useEffect } from "react"
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
  contentHeaderWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  contentHeaderTitle: {
    flex: 1,
    paddingRight: "25%",
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

  useEffect(() => {
    if (searchedMoviesList.length === 0) {
      history.replace("/home")
    }
  }, [searchedMoviesList, history])

  const backButtonHandler = () => {
    dispatch(clearSearchedMovies())
    history.replace("/home")
  }

  return (
    <div className="SearchResult">
      <Header title="Search Result" />
      {searchedMoviesList.length > 0 ? (
        <div className={classes.searchMoviesWrapper}>
          <div className={classes.contentHeaderWrapper}>
            <IconButton edge="start" onClick={() => backButtonHandler()}>
              <ArrowBackIosOutlined />
              back to home
            </IconButton>
            <h3 className={classes.contentHeaderTitle}>Search Result</h3>
          </div>
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
