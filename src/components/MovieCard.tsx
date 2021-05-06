import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { Movie } from "../models/Movie"
import { truncate } from "../utils"
import parse from "html-react-parser"
import { useDispatch } from "react-redux"
import { getMovieDetailFromAPI } from "../redux/movieRedux/movieThunk"
import { useHistory } from "react-router"
import NoImg from "../resources/NoImg.png"
import { clearMovieDetail } from "../redux/movieRedux/movieActions"

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
})

const MovieCard: React.FC<Movie> = (props) => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  const showDetailhandler = async (id: number) => {
    await dispatch(clearMovieDetail())
    await dispatch(getMovieDetailFromAPI(id))
    await history.push("/detail")
  }
  return (
    <Card className={classes.root}>
      {/* <CardActionArea href={props.detailUrl}> */}
      <CardActionArea>
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
          <Typography variant="body2" color="textSecondary" component="p">
            {/* embedd HTML after truncating "summary" because "summary" is a HTML elements */}
            {parse(truncate(props.summary, 130))}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => showDetailhandler(props.id)}
        >
          Show Detail
        </Button>
      </CardActions>
    </Card>
  )
}

export default MovieCard
