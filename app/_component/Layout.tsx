"use client";
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState, useMemo } from "react";
import { defaultTheme } from "../theme";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import { Content } from "next/font/google";
import Links from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import Switch from "@mui/material/Switch";
import { setMode } from "../store/features/theme/theme-slice";
import Background from "./Background";
import { Box, Typography } from "@mui/material";

type LayoutProps = Required<{
  readonly children: React.ReactNode;
}>;

export default function Layout({ children }: LayoutProps) {
  // const [theme, setTheme] = useState(teruraTheme);
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);
  const currentTheme = useSelector(
    (state: RootState) => state.theme.currentTheme
  );
  const mode = useSelector((state: RootState) => state.theme.mode);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setChecked(event.target.checked);
    dispatch(setMode(event.target.checked));
    // console.log(event)
  };
  // dispatch(setMode(checked))

  const theme = useMemo(() => createTheme(defaultTheme(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <Background>
        <Container fixed maxWidth="xl">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ pb:2 }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Links
                href={{
                  pathname: "./",
                }}
              >
                <Image
                  src="/Aki_Takoyaki_Logo.png"
                  width={60}
                  height={60}
                  alt="Picture of the author"
                />
              </Links>
              <Box>
                <Links
                  href={{
                    pathname: "./",
                  }}
                >
                  <Image
                    src={!mode ? "/Aki_font.png" : "/Aki_font_dark.png"}
                    width={200}
                    height={25}
                    alt="Picture of the author"
                  />
                </Links>
                <Typography variant="body1" color="fontColor.main">
                  Daliy Sale
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
              <Switch
                checked={mode}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
              <Typography variant="body2" color="fontColor.main">
                {mode ? "Dark mode" : "Light mode"}
              </Typography>
            </Stack>
          </Stack>
          {children}
        </Container>
      </Background>
    </ThemeProvider>
  );
}
