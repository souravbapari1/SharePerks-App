import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../../interface/user";
import { Bank } from "../../interface/bank";

// Initial state for user data, with user set to null initially
const initialState: {
  user: UserData | null;
} = { user: null };

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    // Action to set or update user data
    setUserData: (state, action: PayloadAction<UserData | null>) => {
      state.user = action.payload;
    },
    // Action to update banks data, only if user exists
    setUserBanksData: (state, action: PayloadAction<Bank[]>) => {
      if (state.user) {
        state.user.banks = action.payload;
      }
    },
  },
});

// Export the actions for use in components or other parts of your application
export const { setUserData, setUserBanksData } = userSlice.actions;

export default userSlice.reducer;
