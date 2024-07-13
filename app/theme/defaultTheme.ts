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
      }
    // mode: mode?"dark": 'dark' as any,
    // primary: {
    //   main: "#BFAF21",
    // },
    // background: {
    //   default: "#11dc6e",
    // },
    // borderColor: {
    //   main: "#ffd400",
    // },
    // tableHeader: {
    //   main: "#ffe77c",
    // },
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