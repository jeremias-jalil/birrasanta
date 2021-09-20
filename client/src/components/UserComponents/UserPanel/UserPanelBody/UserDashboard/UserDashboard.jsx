import React from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Meetups from "./Meetups/Meetups";
import Invitations from "./Invitations/Invitations";

export default function UserDashboard({ id, ounMeetups, invitations}) {
  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              Invitaciones pendientes
              <Invitations invitations={invitations}/>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8} lg={9}>
              <Meetups
                ounMeetups={ounMeetups}
                ounInvitation={invitations}
              />
          </Grid>

          
        </Grid>
      </Container>
    </div>
  );
}
