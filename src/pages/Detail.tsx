import {
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Header from "../components/Header"
import { AppState } from "../redux/store"
import parse from "html-react-parser"
import { ArrowBackIosOutlined } from "@material-ui/icons"
import { useHistory } from "react-router"
import {
  clearMovieDetail,
  clearMovieSeasons,
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
  movieTitleWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  backIcon: {
    padding: "2%",
    marginBlockStart: "0.67em",
    marginBlockEnd: "0.67em",
  },
  genreWrapper: {
    display: "flex",
    flexDirection: "row",
    marginTop: "3%",
  },
  genreItem: {
    marginRight: "3%",
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

  const searchedMovies = useSelector(
    (state: AppState) => state.movieState.searchedMovies
  )

  useEffect(() => {
    // if (searchedMovies.length === 0) {
    //   history.replace("/home")
    // }
  }, [searchedMovies, history])

  const backButtonHandler = () => {
    dispatch(clearMovieDetail())
    dispatch(clearMovieSeasons())
    history.goBack()
  }

  return (
    <div className={classes.Detail}>
      <Header title="Detail" />

      {movieDetail ? (
        <Grid container spacing={3} className={classes.girdWrapper}>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={1} className={classes.backIcon}>
                <IconButton edge="start" onClick={() => backButtonHandler()}>
                  <ArrowBackIosOutlined />
                </IconButton>
              </Grid>
              <Grid item xs={11}>
                <h1>{movieDetail.title}</h1>
              </Grid>
            </Grid>
          </Grid>
          <Divider variant="middle" />
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} md={4} className={classes.movieImage}>
                <img src={movieDetail.image} alt={movieDetail.title} />
                <div className={classes.genreWrapper}>
                  <Typography component="p">Genres: </Typography>
                  {movieDetail.genres?.map((genre, index) => (
                    <Typography
                      component="p"
                      key={`genres-${index}`}
                      className={classes.genreItem}
                    >
                      {genre}
                    </Typography>
                  ))}
                </div>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="body2" component="p" align="left">
                  {movieDetail.summary
                    ? parse(movieDetail.summary)
                    : "No summary"}
                </Typography>

                <Typography component="p" align="left">
                  Total Episodes: {movieDetail.episodeNumber}
                </Typography>
                <Typography component="p" align="left">
                  Rating:{" "}
                  {movieDetail.rating ? movieDetail.rating : "No Rating"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Divider variant="middle" />
          <Divider light />
          <Grid item xs={12} className={classes.seasonsWrapper}>
            <h4>Total Seasons: {movieDetail.seasonNumber}</h4>
            <Grid container spacing={3}>
              {movieSeasons.map((season, index) => (
                <Grid item xs={12} md={3} key={`movieCard-${index}`}>
                  <MovieCard {...season} summary={""} purpose="episodes" />
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
