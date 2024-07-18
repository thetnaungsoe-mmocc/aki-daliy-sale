"use client";
import { createTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { useState,useEffect  } from "react";
import { amber, deepOrange, grey } from '@mui/material/colors';

const defaultTheme = (mode:boolean) => ({
  palette: {
    mode: mode?"dark": 'light' as any,
    fontColor : mode?{
        main: "#FFFFFF",
      }:{
        main : '#000000'
      },
      primary: {
        main: "#E62D2A",
      },
   
    tableHeader: {
      main: "#fc4141",
    },
    tableRow : mode?{
      main: "#160d0d",
    }:{
      main : '#fcf4f4'
    },
    // cardBg: {
    //   main: "#ffffff",
    // },
    // fontColor: {
    //   main: "#BFAF21",
    //   dark: "#000000",
    // },
  },

  // typography: {
  //   h6: {
  //     color: "#333333",
  //   },
  //   subtitle1: {
  //     fontSize: 18,
  //   },
  // },
});


export default defaultTheme;