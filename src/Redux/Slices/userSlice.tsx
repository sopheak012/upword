import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../Interfaces/index";

const initialState: User = {
  id: "",
  email: "",
  isLogin: false,
  // Removed words from initial state
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.isLogin = action.payload.isLogin;
      // Removed words from state update
    },
    clearUser: (state) => {
      state.id = "";
      state.email = "";
      state.isLogin = false;
      // Cleared words from state
    },
    // Removed actions for adding and removing words
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
