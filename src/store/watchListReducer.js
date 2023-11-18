import { createSlice } from "@reduxjs/toolkit";

const watchListSlice = createSlice({
  name: "watchlist",
  initialState: {
    watchList: JSON.parse(localStorage.getItem("watchlist")) || [],
    videoIds: [],
  },
  reducers: {
    saveWatchlist: (state, action) => {
      const video = action.payload;
      if (!state.videoIds.includes(video?.id?.videoId)) {
        state.watchList.push(video);
        localStorage.setItem("watchlist", JSON.stringify(state.watchList));
        state.videoIds.push(video?.id?.videoId);
      }
    },

    removeFromWatchlist: (state, action) => {
      const videoIdToRemove = action.payload;
      const index = state.videoIds.indexOf(videoIdToRemove);
      if (index !== -1) {
        state.watchList.splice(index, 1);
        state.videoIds.splice(index, 1);
      }
    },
  },
});

export const { saveWatchlist, removeFromWatchlist } = watchListSlice.actions;

export default watchListSlice.reducer;
