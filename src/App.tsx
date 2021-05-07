import { createMuiTheme, ThemeProvider } from "@material-ui/core"
import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import "./App.css"
import Detail from "./pages/Detail"
import Episodes from "./pages/Episodes"
import Home from "./pages/Home"
import SearchedResult from "./pages/SearchResult"

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#6abf69",
      main: "#388e3c",
      dark: "#bc5100",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ffb04c",
      main: "#f57f17",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
})

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Switch>
            <Redirect exact from="/" to="home" />
            <Route exact path={"/home"} component={Home} />
            <Route exact path={"/detail"} component={Detail} />
            <Route
              exact
              path={"/searchResult/:word"}
              component={SearchedResult}
            />
            <Route exact path={"/episodes"} component={Episodes} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
