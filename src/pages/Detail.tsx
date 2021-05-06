import { Grid, IconButton, makeStyles } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Header from "../components/Header"
import { AppState } from "../redux/store"
import parse from "html-react-parser"
import { ArrowBackIosOutlined } from "@material-ui/icons"
import { useHistory } from "react-router"
import { clearMovieDetail } from "../redux/movieRedux/movieActions"

const useStyles = makeStyles({
  Detail: {
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

const Detail: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()
  const movieDetail = useSelector(
    (state: AppState) => state.movieState.movieDetail
  )

  return (
    <div className="Detail">
      <Header title="Detail" />
      <IconButton edge="start" onClick={() => history.goBack()}>
        <ArrowBackIosOutlined />
      </IconButton>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1>{movieDetail.title}</h1>
        </Grid>
        <Grid item xs={12} md={4}>
          <img src={movieDetail.image} alt={movieDetail.title} />
        </Grid>
        <Grid item xs={12} md={8}>
          <p>Movie Info</p>
          <p>Seasons: {movieDetail.seasonNumber}</p>
          <p>Episodes: {movieDetail.episodeNumber}</p>
          {/* {movieDetail.genres.map((genre) => (
            <p>{genre}</p>
          ))} */}
          <p>Rating: {movieDetail.rating ? movieDetail.rating : "No Rating"}</p>
        </Grid>
        {/* <Grid item xs={12}>
          <div>{parse(movieDetail.summary)}</div>
        </Grid> */}
      </Grid>
    </div>
  )
}

export default Detail
