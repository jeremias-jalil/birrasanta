import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import TextField from "@mui/material/TextField";

import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import Button from "@mui/material/Button";

import CalendarSelector from "./CalendarSelector/CalendarSelector";

import { newMeetupApi, weatherpApi } from "../../../../../functions/api";
import { forceUpdate } from "../../../../../redux/actions";

const useStyles = makeStyles((theme) => ({
  form: {
    "& .MuiFormControl-root": {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
  },
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    allingItems: "center",
    justifyContent: "center",

    "& .makeStyles-root-11": {
      width: "100%",
    },
  },
  button: {
    width: "100%",
  },

  grid: {
    padding: theme.spacing(2),
  },

  title: {
    paddingLeft: theme.spacing(4),
  },
  box: {
    padding: theme.spacing(2),
  },
}));

export default function NewMeetup() {
  const classes = useStyles();
  const { id } = useParams();

  const { userInfo } = useSelector((state) => state);

  const dispatch = useDispatch();
  const initialState = {
    name: "",
    description: "",
    temp: null,
    date: new Date(),
    status: "Activo",
    userId: id,
    bears: null,
  };

  const [meetup, setMeetup] = useState(initialState);

  async function getWeather() {
    const weatherApi = await weatherpApi();
    const temp = weatherApi.data?.find(
      (e) => new Date(e.datetime).getDate() === new Date(meetup.date).getDate()
    );
    let bearsCalc;
    let max_temp;
    if (temp?.max_temp) {
      max_temp = temp.max_temp;
      bearsCalc = temp.max_temp < 20 ? 0.75 : temp.max_temp > 24 ? 2 : 1;
    } else {
      bearsCalc = 2;
      max_temp = 25;
    }

    setMeetup({ ...meetup, temp: max_temp, bears: bearsCalc });
  }

  useEffect(() => {
    getWeather();
    return () => {
      dispatch(forceUpdate());
    }; // eslint-disable-next-line
  }, [meetup.date]);

  function handleChange(e) {
    setMeetup({ ...meetup, [e.target.name]: e.target.value });
  }

  function setDate(value) {
    setMeetup({ ...meetup, date: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (meetup.name && meetup.description && meetup.temp) {
      await newMeetupApi(meetup, userInfo.token);
      setMeetup(initialState);
      dispatch(forceUpdate());
    }
  }

  return (
    <>
      <Paper className={classes.root}>
        <h1 className={classes.title}>Creear una nueva Meetup</h1>
        <form
          className={classes.form}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Grid container>
            <Grid item className={classes.grid} xs={12} sm={6} md={6}>
              <TextField
                name="name"
                variant="outlined"
                label="Nombre de la meetup"
                value={meetup.name}
                onChange={handleChange}
                required
              />
              <TextField
                name="description"
                multiline
                variant="outlined"
                rows={4}
                label="¿Cual es el motivo de la celebación?"
                value={meetup.description}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item className={classes.grid} xs={12} sm={6} md={6}>
              <CalendarSelector value={meetup.date} setValue={setDate} />
              <Box
                className={classes.box}
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h3>Birras por persona</h3>
                <Rating
                  max={2}
                  name="text-feedback"
                  value={meetup.bears}
                  readOnly
                  precision={0.25}
                  icon={
                    <SportsBarIcon fontSize="inherit" sx={{ fontSize: 50 }} />
                  }
                  emptyIcon={
                    <SportsBarIcon
                      style={{ opacity: 0.55 }}
                      fontSize="inherit"
                      sx={{ fontSize: 50 }}
                    />
                  }
                />
                <Box sx={{ ml: 2 }}>{`${meetup.temp} °C`}</Box>
              </Box>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleSubmit}
          >
            Crear nueva meetup
          </Button>
        </form>
      </Paper>
    </>
  );
}
