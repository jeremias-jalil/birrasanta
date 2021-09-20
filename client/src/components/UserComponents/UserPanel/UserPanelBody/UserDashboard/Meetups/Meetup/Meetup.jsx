import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import AvatarGroup from "@mui/material/AvatarGroup";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

import { asistInMeetupApi } from "../../../../../../../functions/api";
import { forceUpdate } from "../../../../../../../redux/actions";

export default function Meetup({
  id,
  title,
  date,
  description,
  users,
  ounMeetups,
  bears,
  adminId,
  adminName,
  adminimg,
  status,
}) {
  
  const [bearBox, setBearBox] = useState(0);
  const [ouner, setOuner] = useState(false);
  const toDate = new Date(date);
  const userId = useParams().id * 1;
  const dispatch = useDispatch();

  useEffect(() => {
    const bearBoxs = Math.ceil((users.length * bears) / 6);
    setBearBox(bearBoxs);

    if (adminId === userId) {
      setOuner(true);
    }
    // eslint-disable-next-line
  }, [ounMeetups?.length, users?.length]);

  async function handleAsist() {
    await asistInMeetupApi({ meetupId: id * 1, userId: userId * 1 });
    dispatch(forceUpdate());
  }

  return (
    <Card sx={{ width: "100%" }} elevation={3}>
      <CardHeader
        avatar={<Avatar alt="Remy Sharp" src={adminimg} />}
        title={title}
        subheader={`${toDate.getDate()}/${
          toDate.getMonth() + 1
        }/${toDate.getFullYear()} a las ${toDate.getHours()}:${toDate.getMinutes()}`}
        sx={{ boxShadow: 1 }}
      />
      <CardContent>
        <Typography variant="body2" color="text.primpary">
          {`Anfitrión: ${adminName}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Divider sx={{ margin: 2 }} />
        <Typography variant="body2" color="text.primpary">
          Confirmados:
        </Typography>
        <AvatarGroup max={6}>
          {users.map((u) => (
            <Avatar alt={u.username} src={u.img} />
          ))}
        </AvatarGroup>
        <Divider sx={{ margin: 2 }} />
        {ouner ? (
          <Chip label="Anfitrión" color="success" size="small" />
        ) : (
          <></>
        )}
        {ouner ? (
          <Typography variant="body2" color="text.secondary">
            {`${adminName}, tienes que comprar ${bearBox} caja${
              bearBox === 1 ? "" : "s"
            } de cervezas`}
          </Typography>
        ) : (
          <></>
        )}
      </CardContent>
      <CardActions disableSpacing>
        {status === "Cancelled" && toDate > new Date() ? (
          <Button variant="outlined" onClick={handleAsist}>
            Ahora quiero ir
          </Button>
        ) : (
          <></>
        )}
      </CardActions>
      {status === "Present" ? (
        <Alert variant="filled" severity="success">
          Asististe
        </Alert>
      ) : status === "Cancelled" ? (
        <Alert icon={false} variant="filled" severity="error">
          Cancelaste invitación
        </Alert>
      ) : status === "Missing" ? (
        <Alert icon={false} variant="filled" severity="warning">
          No pudiste ir
        </Alert>
      ) : status === "Accepted" && toDate < new Date() ? (
        <Alert icon={false} variant="filled" severity="info">
          ¿Pudeste venir?
        </Alert>
      ) : status === "Pending" && toDate > new Date() ? (
        <Alert icon={false} variant="filled" severity="info">
          ¿Vas a venir?
        </Alert>
      ) : toDate > new Date() ? (
        <Alert icon={false} variant="filled" severity="info">
          Proximamente
        </Alert>
      ) : (
        <Alert icon={false} variant="filled" severity="info">
          Ya pasó
        </Alert>
      )}
    </Card>
  );
}
