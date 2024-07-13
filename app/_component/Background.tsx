import React from "react";
import Box from "@mui/material/Box";

import {
  
  defaultTheme,
} from "../theme";

import { useSelector } from 'react-redux';
import { RootState } from "../store";

interface Props {
  children: React.ReactNode;
  height?: string | number;
}

export default function Background({
  children,
  height = "100vh",
}: Props) {

    const currentTheme = useSelector((state: RootState) => state.theme.currentTheme)
    const mode = useSelector((state: RootState) => state.theme.mode)
    let bg = ""
    if(mode){
        bg = "#000000";
      }else{
        bg = "#FFFFFF";
      }
 
  return (
    <Box
      sx={{
        background: bg,
        paddingY: 2,
        height: height,
      }}
    >
      {children}
    </Box>
  );
}
