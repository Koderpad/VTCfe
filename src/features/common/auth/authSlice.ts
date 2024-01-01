import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store.ts";
import Cookies from "js-cookie";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  error: "",
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { access_token, customerDTO } = action.payload;
      localStorage.setItem("token", access_token);

      return {
        ...state,
        token: access_token,
        user: customerDTO,
        isAuthenticated: true,
      };
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.data.token;
      state.user = action.payload.data;
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.error = "";
      localStorage.removeItem("token");

      // Delete refreshToken cookie
      Cookies.remove("refreshToken");
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setCredentials, loginSuccess, logOut, updateUser } =
  authReducer.actions;

export default authReducer.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
