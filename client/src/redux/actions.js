import { LOGIN_SUCCES, UPDATE, LOGOUT } from "./constant";
import { loguinUserApi } from "../functions/api";
import Swal from "sweetalert2";

export function loguinUser(user) {
  return async function (dispatch) {
    try {
      const userInfo = await loguinUserApi(user);

      if (userInfo.request.status === 200) {
        dispatch({
          type: LOGIN_SUCCES,
          payload: userInfo.data,
        });
        localStorage.setItem("userInfo", JSON.stringify(userInfo.data));
        return userInfo.data;
      } else  {
        Swal.fire({
          icon: "error",
          title: "Oh no!",
          text: userInfo.request.response,
          confirmButtonColor: "#4c3c90",
          customClass: {
            container: "my-swal",
          },
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oh no!",
        text: "Error de acceso",
        confirmButtonColor: "#4c3c90",
        customClass: {
          container: "my-swal",
        },
      });
    }
  };
}

export function forceUpdate() {
  return async function (dispatch) {
    dispatch({
      type: UPDATE,
    });
  };
}

export function logout() {
  return async function (dispatch) {
    dispatch({
      type: LOGOUT,
    });
    localStorage.setItem("userInfo", JSON.stringify({}));
  };
}
