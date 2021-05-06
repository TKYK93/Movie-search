import {
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Header from "../components/Header"
import { AppState } from "../redux/store"
import parse from "html-react-parser"
import { ArrowBackIosOutlined } from "@material-ui/icons"
import { useHistory } from "react-router"
import {
  clearMovieDetail,
  clearSearchedMovies,
} from "../redux/movieRedux/movieActions"
import MovieCard from "../components/MovieCard"

const useStyles = makeStyles({
  Detail: {},
  girdWrapper: {
    padding: "0 3%",
  },
  movieImage: {
    textAlign: "left",
  },
  genreWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  seasonsWrapper: {
    padding: "5%",
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

const Detail: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const movieDetail = useSelector(
    (state: AppState) => state.movieState.movieDetail
  )
  const movieSeasons = useSelector(
    (state: AppState) => state.movieState.movieSeasons
  )

  const backButtonHandler = () => {
    dispatch(clearMovieDetail())
    history.goBack()
  }

  return (
    <div className={classes.Detail}>
      <Header title="Detail" />
      <IconButton edge="start" onClick={() => backButtonHandler()}>
        <ArrowBackIosOutlined />
      </IconButton>
      {movieDetail ? (
        <Grid container spacing={3} className={classes.girdWrapper}>
          <Grid item xs={12}>
            <h1>{movieDetail.title}</h1>
            <Grid container>
              <Grid item xs={12} md={4}>
                <img
                  src={movieDetail.image}
                  alt={movieDetail.title}
                  className={classes.movieImage}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="body2" component="p" align="left">
                  {movieDetail.summary
                    ? parse(movieDetail.summary)
                    : "No summary"}
                </Typography>
                <div className={classes.genreWrapper}>
                  {movieDetail.genres?.map((genre) => (
                    <p>{genre}</p>
                  ))}
                </div>
                <p>Total Episodes: {movieDetail.episodeNumber}</p>
                <p>
                  Rating:{" "}
                  {movieDetail.rating ? movieDetail.rating : "No Rating"}
                </p>
              </Grid>
            </Grid>
          </Grid>
          <Divider variant="middle" />
          <Divider light />
          <Grid item xs={12} className={classes.seasonsWrapper}>
            <p>Total Seasons: {movieDetail.seasonNumber}</p>
            <Grid container spacing={3}>
              {movieSeasons.map((season, index) => (
                <Grid item xs={12} md={3}>
                  <MovieCard
                    key={index}
                    {...season}
                    summary={""}
                    purpose="episodes"
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <div>Sorry, no detail available</div>
      )}
    </div>
  )
}

export default Detail
