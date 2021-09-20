import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Swal from "sweetalert2";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Avatar from "@mui/material/Avatar";

import { registerUserApi } from "../../../../functions/api";

import { loguinUser } from "../../../../redux/actions";

import UploadImg from "./UploadImg/UploadImg";

export default function UserRegister() {
  const initialState = {
    name: "",
    email: "",
    password: "",
    admin: false,
    img: "",
    showPassword: false,
  };

  const [values, setValues] = useState(initialState);

  const [imgUser, setImgUser] = useState(
    "https://i.ibb.co/JmV719n/Birra-Santa-Logo-Color.png"
  );

  const dispatch = useDispatch();

  const history = useHistory();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      values.name.length &&
      values.email.length &&
      values.password.length > 6
    ) {
      const dataUser = { ...values, img: imgUser };
      const userRegister = await registerUserApi(dataUser);
      if (userRegister.user) {
        const userAcces = await dispatch(
          loguinUser({ email: values.email, password: values.password })
        );
        history.push(`/user/${userAcces.user.id}`);
      } else {
        Swal.fire({
          icon: "warning",
          target: document.getElementById('dialogRegister'),
          title: "Ups..!",
          text: `El email: ${values.email} ya se encuentra registrado`,
          confirmButtonColor: "#4c3c90",
          customClass: {
            container: "my-swal",
          },
        });
      }
    }
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar alt={imgUser} src={imgUser} />

          <Typography component="h1" variant="h5">
            Registrate
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  error={values.name.length === 0}
                  value={values.name}
                  autoComplete="fname"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nombre"
                  autoFocus
                  onChange={handleChange("name")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  error={values.email.length === 0}
                  value={values.email}
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange("email")}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ width: "100%" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    error={values.password.length > 6 ? false : true}
                    id="outlined-adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                    required
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                  <em>
                    {values.password.length > 6
                      ? ""
                      : "La contraseña debe tener mas de 6 caracteres"}
                  </em>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <UploadImg setimgUp={setImgUser} />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarse
            </Button>
          </Box>
        </Box>
      </Container>
  );
}
