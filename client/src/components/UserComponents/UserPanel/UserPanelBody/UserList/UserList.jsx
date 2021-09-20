import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import { getAllUserApi, updateUserApi } from "../../../../../functions/api";

export default function UserList() {
  const [userList, setUserList] = useState([]);

  const { userInfo } = useSelector((state) => state);

  const { id } = useParams();

  useEffect(() => {
    getAllUsers();// eslint-disable-next-line
  }, []);

  async function getAllUsers() {
    const allUsers = await getAllUserApi(userInfo.token);
    setUserList(allUsers);
  }

  async function updateUser(id,item,status){
        
    const data = {[item]:status}

    await updateUserApi(id,data,userInfo.token)
    getAllUsers();
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, margin: "30px" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="center">Admin</TableCell>
            <TableCell align="center">Actualizar rol</TableCell>
            <TableCell align="center">Actualizar acceso</TableCell>
            <TableCell align="center">Meetups</TableCell>
            <TableCell align="center">Invitaciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList?.map((row) => {
            return (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Avatar alt={row.username} src={row.img} />
                  {row.username}
                </TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="center">{row.admin ? "Si" : "No"}</TableCell>
                <TableCell align="center">{+row.id===+id? "" :row.admin ? 
                <Button onClick={() => updateUser(row.id,"admin",false)}>Volver a User</Button> : 
                <Button onClick={() => updateUser(row.id,"admin",true)}>Hacer Admin</Button>
                }</TableCell>
                <TableCell align="center">{+row.id===+id? "" :row.active ? 
                <Button onClick={() => updateUser(row.id,"active",false)}>Bloquear</Button> : 
                <Button onClick={() => updateUser(row.id,"active",true)}>Activar</Button>
                }</TableCell>
                <TableCell align="center">{row.Meetups.length}</TableCell>
                <TableCell align="center">{row.Invitations.length}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
