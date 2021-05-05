import { Grid, makeStyles } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { movieAxios } from "../axios"
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

const Home: React.FC = () => {
  const classes = useStyles()
  const [todaysMovies, setTodaysMovies] = useState<Movie[]>([])
  const searchedMoviesList = useSelector(
    (state: AppState) => state.movieState.searchedMovies
  )
  console.log(todaysMovies)
  useEffect(() => {
    movieAxios
      .get("/schedule?country=SE")
      .then((res) => {
        console.log("res.data at Home>>>", res.data)
        if (res.data.length === 0) {
          console.log("No data available")
          return void 0
        } else {
          let tempArray: Movie[] = []
          res.data.array.forEach((movieInfo: any) => {
            const movieData: Movie = {
              id: movieInfo.id,
              title: movieInfo.name,
              image: movieInfo.image.original,
              seasonNumber: movieInfo.season,
              episodeNumber: movieInfo.number,
              summary: movieInfo.summary,
              detailUrl: movieInfo.url,
            }
            tempArray.push(movieData)
          })
          setTodaysMovies(tempArray)
        }
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className={classes.Home}>
      <Header title="Home" />
      {todaysMovies.length > 0 ? (
        todaysMovies.map((movie: Movie) => {
          return (
            <div>
              <p>{movie.title}</p>
              <img src={movie.image} alt={movie.title} />
              {movie.summary && <div>movie.summary</div>}
            </div>
          )
        })
      ) : searchedMoviesList.length > 0 ? (
        <div className={classes.searchMoviesWrapper}>
          <div>Search Result</div>
          <Grid container justify="center" spacing={3}>
            {searchedMoviesList.map((searchedMovie) => (
              <Grid item xs={12} sm={6} md={4}>
                <MovieCard {...searchedMovie} />
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
        <div>No Schedules Movies today</div>
      )}
    </div>
  )
}

export default Home
