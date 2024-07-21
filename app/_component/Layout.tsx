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
import { icon } from "../const";

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
            sx={{ pb: 2 }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Links
                href={{
                  pathname: "./",
                }}
              >
                <Box
                  sx={{
                    width: { md: 70 , xs: 40 },
                    height: { md: 70 , xs: 40 },
                    position: "relative",
                  }}
                >
                  <Image
                    src={icon.mainLogo}
                    alt="logo"
                    layout="fill"
                    objectFit="cover"
                  />
                </Box>
              </Links>
              <Box>
                <Links
                  href={{
                    pathname: "./",
                  }}
                >
                   <Box
                  sx={{
                    width: { md: 280 , xs: 160 },
                    height: { md: 30 , xs: 15 },
                    position: "relative",
                  }}
                >
                  <Image
                    src={!mode ? icon.fontLogo : icon.fontDarkLogo}
                    alt="logo"
                    layout="fill"
                    objectFit="cover"
                  />
                  </Box>
                </Links>
                <Typography color="fontColor.main" sx={{ typography: { md: 'body1', xs: 'caption' } }}>
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
              <Typography variant="body2" color="fontColor.main" sx={{ display: {md:"block", xs: 'none' } }}>
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
