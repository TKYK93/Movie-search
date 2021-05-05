import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import "./App.css"
import Home from "./pages/Home"

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Redirect exact from="/" to="home" />
          <Route exact path={"/home"} component={Home} />
          <Home />
        </Switch>
      </div>
    </Router>
  )
}

export default App
