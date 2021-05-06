import { Grid, makeStyles } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { movieAxios } from "../axios"
import Header from "../components/Header"
import MovieCard from "../components/MovieCard"
import Pulldown from "../components/Pulldown"
import { Movie } from "../models/Movie"
import { AppState } from "../redux/store"

const useStyles = makeStyles({
  countrySelectWrapper: {
    display: "flex",
    flexDirection: "row",
    margin: "1% auto",
    justifyContent: "center",
  },
  moviesWrapper: {
    margin: "3%",
  },
  movieCardWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
})

const pulldownInfo = {
  label: "Country",
  options: ["US", "SE"],
}

const todaysDate = (): string => {
  const today = new Date().toISOString()
  return today.split("T")[0]
}

const Home: React.FC = () => {
  const classes = useStyles()
  const [todaysMovies, setTodaysMovies] = useState<Movie[]>([])
  const searchedMoviesList = useSelector(
    (state: AppState) => state.movieState.searchedMovies
  )
  const selectedCountry = useSelector(
    (state: AppState) => state.movieState.selectedCountry
  )

  useEffect(() => {
    setTodaysMovies([])
    movieAxios
      .get(`/schedule?country=${selectedCountry}&date=${todaysDate()}`)
      .then((res) => {
        if (res.data.length === 0) {
          console.log("No data available")
          return void 0
        } else {
          let tempArray: Movie[] = []
          res.data.forEach((movieInfo: any) => {
            const movieData: Movie = {
              id: movieInfo.id,
              title: movieInfo.name,
              image: movieInfo.show.image.original || undefined,
              seasonNumber: movieInfo.season,
              episodeNumber: movieInfo.number,
              summary: movieInfo.summary || "No summary",
              detailUrl: movieInfo.url,
            }
            tempArray.push(movieData)
          })
          setTodaysMovies(tempArray)
        }
      })
      .catch((err) => console.log(err))
  }, [selectedCountry])

  return (
    <div className="Home">
      <Header title="Home" />
      <div className={classes.moviesWrapper}>
        <Grid container justify="center" spacing={3}>
          {searchedMoviesList.length > 0 ? (
            searchedMoviesList.map((searchedMovie, index) => (
              <Grid key={index} item xs={12} sm={6} md={4}>
                <MovieCard {...searchedMovie} purpose="episodes" />
              </Grid>
            ))
          ) : (
            <>
              <Grid className={classes.countrySelectWrapper} item xs={12}>
                <h3>Today's shows in ...</h3>
                <Pulldown
                  label={pulldownInfo.label}
                  options={pulldownInfo.options}
                />
              </Grid>
              {todaysMovies.length > 0 ? (
                todaysMovies.map((movie: Movie, index) => (
                  <Grid key={index} item xs={12} sm={6} md={4}>
                    <MovieCard {...movie} purpose="home" />
                  </Grid>
                ))
              ) : (
                <div>No Scheduled Shows today</div>
              )}
            </>
          )}
        </Grid>
      </div>
    </div>
  )
}

export default Home
