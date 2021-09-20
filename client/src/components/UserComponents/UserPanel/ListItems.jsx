import React from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import CelebrationIcon from "@mui/icons-material/Celebration";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from '@mui/icons-material/ListAlt';
import Swal from "sweetalert2";
import SportsBarIcon from "@mui/icons-material/SportsBar";

import { logout } from "../../../redux/actions";

export default function ListItems({ id, isAdmin }) {
  
  const dispatch = useDispatch();

  const history=useHistory()

  function logoutUser(){
    Swal.fire({
      title: 'Salir',
      text: "¿Está seguro que desea salir?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout())
        history.push(`/`)
      }
    })
  }

  return (
    <div>
      <ListItem button onClick={()=>history.push(`/user/${id}`)}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Resumen" />
      </ListItem>
      <ListItem button onClick={()=>history.push(`/user/${id}/meetups`)}>
        <ListItemIcon>
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText primary="Mis Meetup" />
      </ListItem>

      {isAdmin?
      <>
      <ListItem button onClick={()=>history.push(`/user/${id}/newmeetup`)}>
        <ListItemIcon>
          <CelebrationIcon />
        </ListItemIcon>
        <ListItemText primary="Crear Meetup" />
      </ListItem>
      <ListItem button onClick={()=>history.push(`/user/${id}/invitation`)}>
        <ListItemIcon>
          <SportsBarIcon />
        </ListItemIcon>
        <ListItemText primary="Invitar" />
      </ListItem>
      <ListItem button onClick={()=>history.push(`/user/${id}/users`)}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Usuarios" />
      </ListItem>
      </>
        :
        <></>
        }
      <ListItem button onClick={()=>logoutUser()}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Salir" />
      </ListItem>
    </div>
  )
}

