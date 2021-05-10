import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { Movie } from "../models/Movie"
import { truncate } from "../utils"
import parse from "html-react-parser"
import { useDispatch } from "react-redux"
import {
  getEpisodesFromAPI,
  getMovieDetailFromAPI,
} from "../redux/movieRedux/movieThunk"
import { useHistory } from "react-router"
import NoImg from "../resources/NoImg.png"
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp"
import { IconButton } from "@material-ui/core"
import { AppState } from "../redux/store"
import { ThunkDispatch } from "redux-thunk"
import { Action, CombinedState } from "redux"

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  content_card_header: {
    padding: "1px 3%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summary: {
    marginBottom: 0,
  },
})

interface MovieCardProps extends Movie {
  purpose: string
}

type AppDispatch = ThunkDispatch<
  CombinedState<AppState>,
  unknown,
  Action<string>
>

const MovieCard: React.FC<MovieCardProps> = (props) => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch: AppDispatch = useDispatch()
  const [showAllSummary, setShowAllSumarry] = useState<boolean>(false)

  const showDetailButton = (purpose: string): boolean => {
    switch (purpose) {
      case "episodes":
        return true
      case "episode":
        return false
      case "detail":
        return true
      default:
        return false
    }
  }

  const showDetailhandler = async (id: number) => {
    switch (props.purpose) {
      case "episodes":
        dispatch(getEpisodesFromAPI(props.id))
          .then(async (res) => {
            // "props.summary === 0" means this MovieCard component is used in Detail Page
            // MovieCard in Detail Page has a button to go back to the previous page(Detail)
            if (props.summary === "") {
              history.push({
                pathname: "/episodes",
                state: { from: "detail" },
              })
            } else {
              history.push("episodes")
            }
          })
          .catch((err) => console.log(err))
        break
      case "detail":
        await dispatch(getMovieDetailFromAPI(id))
        await history.push("/detail")
        break
      default:
        break
    }
  }
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={props.image !== undefined || "" ? props.image : NoImg}
        title={props.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {truncate(props.title, 50)}
        </Typography>
        <div className={classes.content_card_header}>
          <Typography gutterBottom component="p">
            {props.seasonNumber ? `Season: ${props.seasonNumber}` : ""}
          </Typography>
          <Typography gutterBottom component="p">
            {props.episodeNumber ? `Episode: ${props.episodeNumber}` : ""}
          </Typography>
        </div>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          align="left"
          className={classes.summary}
        >
          {/* embedd HTML after truncating "summary" because "summary" is a HTML elements */}
          {showAllSummary
            ? parse(props.summary)
            : parse(truncate(props.summary, 130))}
        </Typography>

        {props.summary !== "No summary" && props.summary.length > 130 && (
          <IconButton onClick={() => setShowAllSumarry(!showAllSummary)}>
            {showAllSummary ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        )}
      </CardContent>
      {showDetailButton(props.purpose) && (
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => showDetailhandler(props.id)}
          >
            {props.purpose === "episodes" ? "Show all episodes" : "Show Detail"}
          </Button>
        </CardActions>
      )}
    </Card>
  )
}

export default MovieCard
