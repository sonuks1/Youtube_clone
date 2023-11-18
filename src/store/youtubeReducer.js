import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../api";

export const fetchVideoBySearch = createAsyncThunk(
  "youtube/fetchVideoBySearch",
  async (val) => {
    const response = await request("/search", {
      params: {
        part: "snippet",
        maxResults: 50,
        q: val,
        type: "video",
      },
    });
    const data = response.data.items;
    return data;
  }
);

const youtubeSlice = createSlice({
  name: "youtube",
  initialState: {
    videos: [],
    channelIcon: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVideoBySearch.fulfilled, (state, action) => {
      state.videos = action.payload;
    });
  },
});

export default youtubeSlice.reducer;
