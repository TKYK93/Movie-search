import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core"
import SearchBar from "./SearchBar"

const useStyles = makeStyles(() => ({
  appBar: {
    minHeight: "60px",
  },
  headerTitle: {
    marginRight: "5%",
  },
}))

interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const classes = useStyles()
  const hideSearchBar = (headerTilte: string) => {
    switch (headerTilte) {
      case "Detail":
        return true
      case "Search Result":
        return true
      default:
        return false
    }
  }

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar variant="dense">
        <Typography
          variant="h6"
          color="inherit"
          className={classes.headerTitle}
        >
          {title}
        </Typography>
        {!hideSearchBar(title) && <SearchBar />}
      </Toolbar>
    </AppBar>
  )
}

export default Header
