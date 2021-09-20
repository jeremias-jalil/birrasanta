import React,{useEffect, useState} from "react";
import List from "@mui/material/List";

import Divider from "@mui/material/Divider";

import Invitation from "./Invitation/Invitation";

export default function Invitations({invitations}) {
  const [penInv, setPenInv]= useState([])
  
  useEffect(() => {
    setPenInv(invitations?.filter(e=>e.status==="Pending" || e.status==="Accepted"))
    
  }, [invitations])
  
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
       {penInv?.map(inv=>
       <>
        <Invitation 
            img={inv.Meetup?.adminimg}
            adminName={inv.Meetup?.adminName}
            title={inv.name}
            meetupId={inv.MeetupId}
            invitationId={inv.id}
            userId={inv.UserId}
            status={inv.status}
            date={new Date(inv.date)}
        />
        <Divider variant="inset" component="li" />
        </>
          )}
    </List>
  );
}
