import React from "react"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import InputBase from "@material-ui/core/InputBase"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import SearchIcon from "@material-ui/icons/Search"
import { getSearchedMoviesFromAPI } from "../redux/movieRedux/movieThunk"
import { useDispatch } from "react-redux"

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

  const searchWordHandler = (searchWord: string) => {
    dispatch(getSearchedMoviesFromAPI(searchWord))
  }

  return (
    <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search Movies"
        inputProps={{ "aria-label": "search google maps" }}
        onChange={(e) => {
          searchWordHandler(e.target.value)
        }}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default SearchBar
