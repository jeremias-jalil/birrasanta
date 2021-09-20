

import axios from "axios";
import Swal from "sweetalert2";



require("dotenv").config();
const BACK_SERVER =
  process.env.REACT_APP_BACK_SERVER || "http://localhost:3030";

// ------------------------------ USER ---------------------------------------

export async function loguinUserApi(user) {
  try {
    const data = await axios.post(`${BACK_SERVER}/user/login`, user);
    return data;
  } catch (err) {
    console.log("error-loguinUserApi", err);
    return err;
  }
}

export async function registerUserApi(user) {
  try {
    const response = await axios.post(`${BACK_SERVER}/user/register`, user);
    return response.data;
  } catch (err) {
    console.log("error-registerUserApi", err);
    return err;
  }
}

export async function getUserApi(id) {
  try {
    const response = await axios.get(`${BACK_SERVER}/user/${id}`);
    return response.data;
  } catch (err) {
    console.log("error-registerUserApi", err);
    return err;
  }
}

export async function getAllUserApi(userAcces) {
  try {
    const response = await axios.get(`${BACK_SERVER}/user/allusers`,{
      headers: { Authorization: `Bearer ${userAcces}` }
  });
    return response.data;
  } catch (err) {
    console.log("error-registerUserApi", err);
    return err;
  }
}

export async function updateUserApi(id,data,userAcces) {
  try {
    const response = await axios.put(`${BACK_SERVER}/user/${id}`,data,{
      headers: { Authorization: `Bearer ${userAcces}` }
  });
    return response.data;
  } catch (err) {
    console.log("error-registerUserApi", err);
    return err;
  }
}

// ------------------------------ MEETUP ---------------------------------------

export async function getAllMeetupApi(userAcces) {
  try {
    const response = await axios.get(`${BACK_SERVER}/meetup/getall`,{
      headers: { Authorization: `Bearer ${userAcces}` }
  });
    return response.data;
  } catch (err) {
    console.log("error-registerUserApi", err);
    return err;
  }
}

export async function newMeetupApi(data,userAcces) {
  try {
    const response = await axios.post(`${BACK_SERVER}/meetup/new`, data,{
      headers: { Authorization: `Bearer ${userAcces}` }
  });
    if (response.status === 200) {
      Swal.fire(
        "Excelente!",
        "Se agrego una nueva meetup con exito!",
        "success"
      );
    }
    return response.data;
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oh no!",
      text: "Hubo un error al intentar crear la Meetup, intente nuevamente",
      confirmButtonColor: "#4c3c90",
      customClass: {
        container: "my-swal",
      },
    });
    console.log("error-newMeetupApi", err);
    return err;
  }
}

export async function asistInMeetupApi(data) {
  try {
    const response = await axios.post(`${BACK_SERVER}/meetup/add`, data);
    if (response.status === 200) {
      Swal.fire(
        "Excelente!",
        "Feliz de tenerte con nosotros en la Meetup!",
        "success"
      );
    }

    return response.data;
  } catch (err) {
    console.log("error-registerUserApi", err);
    return err;
  }
}

export async function weatherpApi() {
  var options = {
    method: "GET",
    url: "https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily",
    params: { lat: "-32.40", lon: "-63.24" },
    headers: {
      "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
      "x-rapidapi-key": "4eaa52de90mshd2e68e9bed6ba0cp186667jsne58dca90f0e8",
    },
  };
  try {
    const weather = await axios.request(options);
    return weather.data;
  } catch (err) {
    console.log("error-weatherpApi", err);
    return err;
  }
}


export async function deleteMeetupApi(id,userAcces) {
  try {
    const response = await axios.delete(`${BACK_SERVER}/meetup/delete/${id}`,{
      headers: { Authorization: `Bearer ${userAcces}` }
  });
    return response.data;
  } catch (err) {
    console.log("error-registerUserApi", err);
    return err;
  }
}

// ------------------------------ INVITATION ---------------------------------------

export async function newInvitationpApi(data, userAcces) {
  try {
    if (data.users.length > 0) {
      const toDate = new Date(data.meetup.date);
      const nameDate = `${toDate.getDate()}/${toDate.getMonth()}/${toDate.getFullYear()}`
      const invitations = data.users.map((user) => {

        let dataInvitation = {
          name: `${data.meetup.name} el ${nameDate}`,
          date: data.meetup.date,
          status: "Pending",
          userId: user.id,
          meetupId: data.meetup.id,
        };
        return axios.post(`${BACK_SERVER}/invitation/new`, dataInvitation,{
          headers: { Authorization: `Bearer ${userAcces}` }
      });
      });
      await Promise.all(invitations);
      Swal.fire(
        "Excelente!",
        "Se agrego una nueva meetup con exito!",
        "success"
      );
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "No se ingresaron colegas para invitar",
        confirmButtonColor: "#DE0903",
        customClass: {
          container: "my-swal",
        },
      });
    }
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oh no!",
      text: "Hubo un error al intentar crear la Meetup, intente nuevamente",
      confirmButtonColor: "#DE0903",
      customClass: {
        container: "my-swal",
      },
    });
    console.log("error-newMeetupApi", err);
    return err;
  }
}

export async function updateInvitationpApi(data) {
  try {

    const response = await axios.put(`${BACK_SERVER}/invitation/update`, data);
    if (response.status === 200) {
      if(data.status === "Accepted" || data.status === "Present" )
      Swal.fire(
        "Excelente!",
        "Feliz de tenerte con nosotros en la Meetup!",
        "success"
      );else{
        Swal.fire(
          "Uh que pena!",
          "Te esperaremos en la próxima!",
          "success"
        )
      }
    }

    return response.data;
  } catch (err) {
    console.log("error-registerUserApi", err);
    return err;
  }
}

