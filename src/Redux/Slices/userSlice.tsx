import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../Interfaces/index";

const initialState: User = {
  email: "",
  isLogin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.email = action.payload.email;
      state.isLogin = action.payload.isLogin;
    },
    clearUser: (state) => {
      state.email = "";
      state.isLogin = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
