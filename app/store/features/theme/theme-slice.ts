import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { defaultTheme } from "@/app/theme";

export interface ThemeState {
    mode: boolean;
    currentTheme: {};
  }
  
  const initialState: ThemeState = {
    mode: false,
    currentTheme: defaultTheme,
    // currentTheme: tiffanyTheme,
  };
  
  export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
      setMode: (state, action) => {
        state.mode = action.payload;
      },
      setTheme: (state, action) => {
        state.currentTheme = action.payload;
      },
    },
  });
  
  export const { setMode, setTheme } = themeSlice.actions;
  export default themeSlice.reducer;