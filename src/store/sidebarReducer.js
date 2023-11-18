import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    openSidebar: false,
  },
  reducers: {
    toggleSidebar: (state, action) => {
      state.openSidebar = action.payload;
    },
  },
});
export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
