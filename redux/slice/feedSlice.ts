import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeedData } from "../../interface/feed";

const initialState: { data: FeedData | null } = {
  data: null,
};

const feedSlice = createSlice({
  name: "feedSlice",
  initialState,
  reducers: {
    setFeed: (state, action: PayloadAction<FeedData | null>) => {
      state.data = action.payload;
    },
  },
});

export const { setFeed } = feedSlice.actions;

export default feedSlice.reducer;
