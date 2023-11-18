import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarReducer";
import watchListReducer from "./watchListReducer";
import authReducer from "./authReducer";
import youtubeReducer from "./youtubeReducer";

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    watchlist: watchListReducer,
    auth: authReducer,
    youtube: youtubeReducer,
  },
});

export default store;
