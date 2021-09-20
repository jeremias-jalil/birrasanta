import React from "react";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Chip from '@mui/material/Chip';

import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";

import { updateInvitationpApi } from "../../../../../../../functions/api";
import { forceUpdate } from "../../../../../../../redux/actions";

export default function Invitation({
  img,
  adminName,
  title,
  meetupId,
  invitationId,
  userId,
  status,
  date,
}) {
  const dispatch = useDispatch();
  async function handleSubmit(status) {
    const data = {
      status,
      userId,
      invitationId,
      meetupId,
    };
    await updateInvitationpApi(data);
    dispatch(forceUpdate());
  }

  return (
    ((status==="Pending" && date > new Date()) || (status==="Accepted" && date < new Date()) )?
    <>
    <Chip
  avatar={<Avatar alt="Natacha" src={img} />}
  label={`Invitación de ${adminName}`}
  color="info"
  elevation={3}
  />
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={title}
        secondary={
          status === "Pending" ? (
            <>
              <ButtonGroup variant="contained" size="small">
                <Button color="success" onClick={() => handleSubmit("Accepted")}>Voy</Button>
                <Button
                  color="error"
                  onClick={() => handleSubmit("Cancelled")}
                >
                  No voy
                </Button>
              </ButtonGroup>
            </>
          ) : (
            <>
              <ButtonGroup variant="contained" size="small">
                <Button color="success" onClick={() => handleSubmit("Present")}>Fuí</Button>
                <Button
                  color="error"
                  onClick={() => handleSubmit("Missing")}
                >
                  No pude ir
                </Button>
              </ButtonGroup>
            </>
          )
        }
      />
    </ListItem>
    </>:
    <></>
  );
}
