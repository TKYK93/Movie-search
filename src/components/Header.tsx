import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core'
import SearchBar from './SearchBar'

const useStyles = makeStyles(() => ({
  appBar: {
    minHeight: '60px',
  },

}))

interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const classes = useStyles()

  return (
      <AppBar position="static" className={classes.appBar}>
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className="header.menuButton"
            color="inherit"
            aria-label="menu"

          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            {title}
          </Typography>
          <SearchBar />
        </Toolbar>
      </AppBar>
  )
}

export default Header
