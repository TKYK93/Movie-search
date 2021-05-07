import React, { useState } from "react"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import InputBase from "@material-ui/core/InputBase"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import SearchIcon from "@material-ui/icons/Search"
import {
  getSearchedMoviesFromAPI,
  getSingleSearchedMovieFromAPI,
} from "../redux/movieRedux/movieThunk"
import { useDispatch } from "react-redux"
import { Divider } from "@material-ui/core"
import { useHistory } from "react-router"
import { clearSearchedMovies } from "../redux/movieRedux/movieActions"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      margin: "5px auto",
      display: "flex",
      alignItems: "center",
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
)
const SearchBar: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const [input, setInput] = useState<string>("")
  const searchDisable = input === "" ? true : false

  const searchSingleMovieHandler = (searchWord: string) => {
    if (searchWord === "") {
      return dispatch(clearSearchedMovies())
    } else {
      setInput(searchWord)
      dispatch(getSingleSearchedMovieFromAPI(searchWord))
    }
  }

  const searchMoviesHandler = async (e: any) => {
    if (input === "") {
      return void 0
    }
    await e.preventDefault()
    await dispatch(getSearchedMoviesFromAPI(input))
    await setInput("")
    await history.push(`/searchResult/${input}`)
  }

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search Series"
        onChange={(e) => {
          searchSingleMovieHandler(e.target.value)
        }}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
        onClick={searchMoviesHandler}
        disabled={searchDisable}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default SearchBar
