import React from "react";
import { useSelector } from "react-redux";

import Container from "@mui/material/Container";
import Masonry from "@mui/lab/Masonry";
import MasonryItem from "@mui/lab/MasonryItem";

import Meetup from "./Meetup/Meetup";

export default function Meetups({ ounMeetups, ounInvitation }) {

  const { update } = useSelector((state) => state);
 
  return (
    <Container>
{      ounInvitation?.length?
      <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={1}>
        {ounInvitation?.map((inv, index) => (
          <MasonryItem key={index}>
            <Meetup
              title={inv.Meetup.name}
              date={inv.Meetup.date}
              description={inv.Meetup.description}
              users={inv.Meetup.Users}
              ounMeetups={ounMeetups}
              id={inv.Meetup.id}
              bears={inv.Meetup.bears}
              adminId={inv.Meetup.adminId}
              adminName={inv.Meetup.adminName}
              adminimg={inv.Meetup.adminimg}
              status={inv.status}
            />
          </MasonryItem>
        ))}
      </Masonry>:
      <div style={{display:"flex", justifyContent:"center"}}>
      <img src="https://i.ibb.co/JmV719n/Birra-Santa-Logo-Color.png" alt="logo"/>
      </div>
      }
      {update?<></>:<></>}
    </Container>
  );
}
