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

const App: React.FC = () => {
  return (
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
  )
}

export default App
