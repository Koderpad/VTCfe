import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store.ts";

const initialState = {
  isLoading: false,
  data: null,
};

const productsReducer = createSlice({
  name: "products",
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
});

export const { setCredentials} = productsReducer.actions;

export default productsReducer.reducer;

// export const selectCurrentUser = (state: RootState) => state.auth.user;
// export const selectCurrentToken = (state: RootState) => state.auth.token;
