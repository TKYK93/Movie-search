import { Grid, IconButton, makeStyles } from "@material-ui/core"
import { ArrowBackIosOutlined } from "@material-ui/icons"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router"
import Header from "../components/Header"
import MovieCard from "../components/MovieCard"
import { Movie } from "../models/Movie"
import { AppState } from "../redux/store"

const useStyles = makeStyles({
  Home: {
    // marign: 0,
    // padding: 0,
    // boxSizing: "border-box",
  },
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
  const history = useHistory()
  const searchedMoviesList = useSelector(
    (state: AppState) => state.movieState.searchedMovies
  )

  return (
    <div className={classes.Home}>
      <Header title="SearchedResult" />
      {searchedMoviesList.length > 0 ? (
        <div className={classes.searchMoviesWrapper}>
          <IconButton edge="start" onClick={() => history.push("/home")}>
            <ArrowBackIosOutlined />
            back to home
          </IconButton>
          <h3>Search Result</h3>
          <Grid container justify="center" spacing={3}>
            {searchedMoviesList.map((searchedMovie, index) => (
              <Grid key={index} item xs={12} sm={6} md={4}>
                <MovieCard {...searchedMovie} />
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
