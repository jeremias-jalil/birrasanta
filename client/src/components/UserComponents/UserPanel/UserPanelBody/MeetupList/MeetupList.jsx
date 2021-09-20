import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import Swal from "sweetalert2";

import { deleteMeetupApi } from "../../../../../functions/api";
import { forceUpdate } from "../../../../../redux/actions";

export default function MeetupList({ ounMeetups }) {
  const { userInfo } = useSelector((state) => state);
  const userId = useParams().id * 1;
  const dispatch = useDispatch();

  async function deleteMeetup(id, userAcces){
    const result = await Swal.fire({
      title: 'Eliminar',
      text: "¿Está seguro que desea eliminar la Meetup?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    })
      if (result.isConfirmed) {
        await deleteMeetupApi(id,userAcces)
        dispatch(forceUpdate());
      }
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Meetup</TableCell>
            <TableCell>Anfitrión</TableCell>
            <TableCell align="center">Fecha</TableCell>
            <TableCell align="center">Temperatura</TableCell>
            {userInfo.user?.admin ? (
              <>
                <TableCell align="center">Cant. Birras</TableCell>
                <TableCell align="center">Cant. Cajas</TableCell>
                <TableCell align="center">Eliminar</TableCell>
              </>
            ) : (
              <></>
            )}
            <TableCell align="center">Confirmaron</TableCell>
            <TableCell align="center">Asistieron</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ounMeetups?.map((row) => {
            const toDate = new Date(row.date);
            const bearBox = Math.ceil((row.Users.length * row.bears) / 6);
            const userAsist = row.Invitations?.filter(
              (i) => i.status === "Present"
            );

            return (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>
                  <Avatar alt={row.adminName} src={row.adminimg} />
                  {row.adminName}
                </TableCell>
                <TableCell align="center">{`${toDate.getDate()}/${toDate.getMonth()}/${toDate.getFullYear()} ${toDate.getHours()}:${toDate.getMinutes()}`}</TableCell>
                <TableCell align="center">{`${row.temp} °C`}</TableCell>
                {userInfo.user?.admin ? (
                  <>
                    <TableCell align="center">
                      {row.Users.length * row.bears}
                    </TableCell>
                    <TableCell align="center">{bearBox}</TableCell>
                    <TableCell align="center">
                    {row.adminId===userId?
                    <Tooltip title="Delete">
                        <IconButton onClick={()=>deleteMeetup(row.id, userInfo.token)}>
                        <DeleteIcon />
                        </IconButton>
                      </Tooltip>:<></>}
                    </TableCell>
                  </>
                ) : (
                  <></>
                )}
                <TableCell align="center">
                  <AvatarGroup max={6}>
                    {row.Users.map((u) => (
                      <Avatar alt={u.username} src={u.img} />
                    ))}
                  </AvatarGroup>
                </TableCell>
                <TableCell align="center">
                  <AvatarGroup max={6}>
                    {userAsist?.map((u) => (
                      <Avatar alt={u.User.username} src={u.User.img} />
                    ))}
                  </AvatarGroup>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
