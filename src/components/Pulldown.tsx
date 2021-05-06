import React, { useState } from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import InputLabel from "@material-ui/core/InputLabel"
import FormHelperText from "@material-ui/core/FormHelperText"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import NativeSelect from "@material-ui/core/NativeSelect"
import { useDispatch } from "react-redux"
import { setCountry } from "../redux/movieRedux/movieActions"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
)

interface PulldownProps {
  label: string
  options: string[]
}

const Pulldown: React.FC<PulldownProps> = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [selectedOption, setSelectedOption] = useState<string>(props.options[0])

  const optionSelectHandler = (e: any) => {
    console.log(e.target.value)
    setSelectedOption(e.target.value)
    switch (props.label) {
      case "Country":
        dispatch(setCountry(e.target.value))
        break
      default:
        break
    }
  }

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel htmlFor="outlined-options">{props.label}</InputLabel>
      <Select
        native
        value={selectedOption}
        onChange={optionSelectHandler}
        label={props.label}
      >
        {props.options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </FormControl>
  )
}

export default Pulldown
