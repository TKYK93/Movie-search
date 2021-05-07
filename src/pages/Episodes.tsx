import { Grid, IconButton, makeStyles } from "@material-ui/core"
import { ArrowBackIosOutlined } from "@material-ui/icons"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useLocation } from "react-router"
import Header from "../components/Header"
import MovieCard from "../components/MovieCard"
import { clearSearchedMovies } from "../redux/movieRedux/movieActions"
import { AppState } from "../redux/store"

const useStyles = makeStyles({
  searchMoviesWrapper: {
    padding: "0 3%",
  },
  backButton: {
    float: "left",
  },
  movieCardWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
})

interface LocationStateProps {
  from: string
}

const Episodes: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const location = useLocation()
  const locationState = location.state as LocationStateProps
  const history = useHistory()
  const episodes = useSelector(
    (state: AppState) => state.movieState.movieEpisodes
  )

  useEffect(() => {
    if (episodes.length === 0) {
      history.replace("/home")
    }
  }, [])

  const backButtonhandler = () => {
    // clear the SearchedMovies state in Redux only when singleSearched (the func in MovieCard.tsx)
    if (locationState?.from !== "detail" || undefined) {
      dispatch(clearSearchedMovies())
    }
    history.goBack()
  }

  return (
    <div className="Episodes">
      <Header title="Episodes" />
      {episodes.length > 0 ? (
        <div className={classes.searchMoviesWrapper}>
          <IconButton
            className={classes.backButton}
            onClick={() => backButtonhandler()}
          >
            <ArrowBackIosOutlined />
            Back
          </IconButton>
          <Grid container justify="center" spacing={3}>
            {episodes.map((episodes, index) => (
              <Grid key={index} item xs={12} sm={6} md={4}>
                <MovieCard {...episodes} purpose="episode" />
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
        <div>No Multiple Episodes</div>
      )}
    </div>
  )
}

export default Episodes
