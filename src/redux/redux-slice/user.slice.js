import { createSlice } from "@reduxjs/toolkit";
import {
  getTokenLocal,
  getUserLocal,
  setTokenLocal,
  setUserLocal,
} from "../../utils/localStorage.util";

const initialState = {
  v_user_info: getUserLocal(),
  x_auth_token: getTokenLocal(),
  User: [],
};

//internally using immer lib (can create mutable state)
export const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      setUserLocal(action.payload);
      state.v_user_info = action.payload;
    },
    updateToken: (state, action) => {
      setTokenLocal(action.payload);
      state.x_auth_token = action.payload;
    },
    updateAllUser: (state, action) => {
      state.User = action.payload;
    },
    resetUser: (state, action) => {
      state.User = [];

    }
  },
});

// this is for dispatch
export const { updateUser, updateToken, updateAllUser,resetUser } = userSlice.actions;

// this is for configureStore
export default userSlice.reducer;