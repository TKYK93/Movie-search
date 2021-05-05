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
  const dispatch = useDispatch()

  const showDetailhandler = (id: number) => {
    console.log("id of selectedMovie>>", id)
    dispatch(getMovieDetailFromAPI(id))
  }
  return (
    <Card className={classes.root}>
      {/* <CardActionArea href={props.detailUrl}> */}
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.image}
          title={props.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <div className={classes.content_card_header}>
            <Typography gutterBottom component="p">
              Season: {props.seasonNumber ? props.seasonNumber : "N/A"}
            </Typography>
            <Typography gutterBottom component="p">
              Episode: {props.episodeNumber ? props.episodeNumber : "N/A"}
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
