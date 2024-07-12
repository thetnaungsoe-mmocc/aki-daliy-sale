"use client";
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
// import {
//   defaultTheme,
//   tiffanyTheme,
//   lavenderTheme,
//   teruraTheme,
// } from "../theme";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import { Content } from "next/font/google";
import Links from "next/link";
import { usePathname } from "next/navigation";
import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

type LayoutProps = Required<{
  readonly children: React.ReactNode;
}>;

export default function Layout({ children }: LayoutProps) {
  return (
    <Container fixed maxWidth="xl">
      <Stack
        direction="row"
        alignItems="center"
        // justifyContent="space-between"
        spacing={5}
        sx={{ mb: 3 }}
      >
        <Links
          tabIndex={-1}
          href={{
            pathname: "/main",
          }}
        >
          <Image
            src="/logo/logo.svg"
            width={100}
            height={100}
            alt="Picture of the author"
          />
        </Links>
        <Typography variant="h6" fontWeight="bold" color="fontColor.main">
          {/* {ScreenTitle} */}
        </Typography>
        {/* <ThemeToggle setTheme={setTheme} /> */}
      </Stack>
      {children}
    </Container>
  );
}
