import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../types";


type InitialState = {
  user: User | null;
}

const initialState: InitialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    loginFailure: (state) => {
      state.user = null;
    },
    logout: (state) => {
      state.user = null;
    },
    userUpdated: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    refreshedToken: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    }
  },
});

export default authSlice.reducer;
export const { loginSuccess, loginFailure, logout, userUpdated } =
  authSlice.actions;
