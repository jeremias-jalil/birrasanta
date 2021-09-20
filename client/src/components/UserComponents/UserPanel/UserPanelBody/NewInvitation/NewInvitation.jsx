import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Masonry from "@mui/lab/Masonry";
import MasonryItem from "@mui/lab/MasonryItem";

import Select from "@mui/material/Select";

import { getAllUserApi } from "../../../../../functions/api";
import { newInvitationpApi } from "../../../../../functions/api";

import { forceUpdate } from "../../../../../redux/actions";

const useStyles = makeStyles((theme) => ({
  form: {
    "& .MuiFormControl-root": {
      width: "100%",
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
  select: {
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

export default function NewInvitation({ounMeetups = []}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const initialState = {
    status: "Pending",
    meetup: {},
  };

  const { userInfo, update } = useSelector((state) => state);

  const [invitation, setInvitation] = useState(initialState);
  const [meetup, setMeetup] = useState([]);
  const [users, setUsers] = useState([]);
  const [usersForInv, setUsersForInv] = useState([]);
  const [usersInvited, setUsersInvited] = useState([]);
  const [usersConfirmed, setUsersConfirmed] = useState([]);
  const [usersMeetInvited, setUsersMeetInvited] = useState([]);

  useEffect(() => {
      return () => {
      dispatch(forceUpdate());
    }; // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getData();
    setMeetup(ounMeetups);
; // eslint-disable-next-line
  }, [ounMeetups.length, update]);



  async function getData() {
    const allUsers = await getAllUserApi(userInfo.token);
    setUsers(allUsers.filter(u=>u.active));
  
  }

  function handleChange(e) {
    const meet = e.target.value
    setInvitation({ ...invitation, meetup: meet });
    
    const userInvitedMap = meet.Invitations.map(Inv=>{
      const userInv=users.find(e=>e?.id*1===Inv.UserId*1)
      
      return userInv
    })
    setUsersMeetInvited(userInvitedMap)
    setUsersConfirmed(meet.Users)

    
    const restUser = users.filter(user=>(
      !userInvitedMap.includes(user) &&
      !meet.Users.includes(user)
    ))
    setUsersForInv(restUser)
    setUsersInvited([])
   

  }

  function handleInvitations(user) {
    setUsersInvited([...usersInvited, user]);
    setUsersForInv(usersForInv.filter((u) => u.id !== user.id));
  }

  function handleUnInvitations(user) {
    setUsersForInv([...usersForInv, user]);
    setUsersInvited(usersInvited.filter((u) => u.id !== user.id));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await newInvitationpApi({ ...invitation, users: usersInvited }, userInfo.token);
    setUsersInvited([]);
    setUsersForInv([])
    setUsersConfirmed([])
    setUsersMeetInvited([])
    setInvitation(initialState);
    dispatch(forceUpdate());
  
  }

  return (
    <>
      <Paper className={classes.root}>
        <h1 className={classes.title}>Invita a tus colegas a la Meetup</h1>
        <form
          className={classes.form}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Grid container>
          <Grid item className={classes.grid} xs={12} sm={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Meetup</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="meetup"
                  value={invitation.meetup}
                  label="Meetup"
                  onChange={handleChange}
                  className={classes.select}
                >
                  {meetup?.map((e) => {
                    const toDate = new Date(e.date);
                    return (
                      <MenuItem value={e}>{`${
                        e.name
                      } el ${`${toDate.getDate()}/${toDate.getMonth()}/${toDate.getFullYear()}`}`}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item className={classes.grid} xs={12} sm={6} md={4}>
              <Paper className={classes.box} elevation={3}>
                <Typography variant="h5" color="text.prymary">
                  Invitar a colegas
                </Typography>
                <Masonry columns={{ xs: 1, sm: 1, md: 2 }} spacing={1}>
                {usersForInv.map((user) => (
                  <MasonryItem key={user.id}>
                  <ListItem
                    key={user.id}
                    disablePadding
                    onClick={() => handleInvitations(user)}
                  >
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar alt={user.username} src={user.img} />
                      </ListItemAvatar>
                      <ListItemText id={user.id} primary={user.username} />
                    </ListItemButton>
                  </ListItem>
                  </MasonryItem>
                ))}
                </Masonry>
              </Paper>
            </Grid>
            <Grid item className={classes.grid} xs={12} sm={6} md={4}>
              <Paper className={classes.box} elevation={3}>
                <Typography variant="h5" color="text.prymary">
                  Enviar invitación
                </Typography>
                <Masonry columns={{ xs: 1, sm: 1, md: 2 }} spacing={1}>
                {usersInvited.map((user) => (
                  <MasonryItem key={user.id}>
                  <ListItem
                    key={user.id}
                    disablePadding
                    onClick={() => handleUnInvitations(user)}
                  >
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar alt={user.username} src={user.img} />
                      </ListItemAvatar>
                      <ListItemText id={user.id} primary={user.username} />
                    </ListItemButton>
                  </ListItem>
                </MasonryItem>
                ))}
                </Masonry>
              </Paper>
            
            </Grid>
            <Grid item className={classes.grid} xs={12} sm={6} md={4}>
              <Paper className={classes.box} elevation={3}>
                <Typography variant="h5" color="text.prymary">
                  Confirmados
                </Typography>
                <Masonry columns={{ xs: 1, sm: 1, md: 2 }} spacing={1}>
                {usersConfirmed?.map((user) => (
                  <MasonryItem key={user.id+"conf"}>
                  <ListItem
                    key={user.id}
                    disablePadding
                  >
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar alt={user.username} src={user.img} />
                      </ListItemAvatar>
                      <ListItemText id={user.id} primary={user.username} />
                    </ListItemButton>
                  </ListItem>
                </MasonryItem>
                ))}
                </Masonry>
              </Paper>
              <Paper className={classes.box} elevation={3}>
                <Typography variant="h5" color="text.prymary">
                  Invitados
                </Typography>
                <Masonry columns={{ xs: 1, sm: 1, md: 2 }} spacing={1}>
                {usersMeetInvited?.map((user) => (
                  <MasonryItem key={user.id+"conf"}>
                  <ListItem
                    key={user.id}
                    disablePadding
                  >
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar alt={user.username} src={user.img} />
                      </ListItemAvatar>
                      <ListItemText id={user.id} primary={user.username} />
                    </ListItemButton>
                  </ListItem>
                </MasonryItem>
                ))}
                </Masonry>
              </Paper>
            
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleSubmit}
          >
            Enviar invitaciones
          </Button>
        </form>
      </Paper>
    </>
  );
}
