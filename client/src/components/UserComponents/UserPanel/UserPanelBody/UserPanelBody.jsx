import React from "react";
import { Route, Redirect } from "react-router";

import UserDashboard from "./UserDashboard/UserDashboard";
import NewMeetup from "./NewMeetup/NewMeetup";
import MeetupList from "./MeetupList/MeetupList";
import UserList from "./UserList/UserList";
import NewInvitation from "./NewInvitation/NewInvitation";

export default function UserPanelBody({ dataUser }) {
  const isAdmin = dataUser.admin;
 
 
  return (
    <div>
      <Route exact path="/user/:id">
        <UserDashboard
          ounMeetups={dataUser.Meetups}
          invitations={dataUser.Invitations}
        />
      </Route>
      <Route exact path="/user/:id/newmeetup">
        {isAdmin ? <NewMeetup /> : <Redirect to="/" />}
      </Route>
      <Route exact path="/user/:id/meetups"> 
          <MeetupList ounMeetups={dataUser.Meetups} />
      </Route>
      <Route exact path="/user/:id/users">
        {isAdmin ? <UserList /> : <Redirect to="/" />}
      </Route>
      <Route exact path="/user/:id/invitation">
        {isAdmin ? <NewInvitation ounMeetups={dataUser.Meetups}/> : <Redirect to="/" />}
      </Route>
    </div>
  );
}
