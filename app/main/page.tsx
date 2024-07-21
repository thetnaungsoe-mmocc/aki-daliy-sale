"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useWatch } from "react-hook-form";
import {
  Button,
  Input,
  Stack,
  TextField,
  Box,
  Typography,
  NoSsr,
} from "@mui/material";
import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { FormValues, TabPanelProps } from "./type";
import { defaultValue } from "./const";
import FoodTable from "./_components/FoodTable";
import DrinkTable from "./_components/DrinkTable";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ja";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/ja";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ExcelExport from "./_components/ExcelExport";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function MainScreen() {
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    setError,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      formData: defaultValue,
    },
  });

  const { fields: foodFields } = useFieldArray({
    control,
    name: "formData.foods.detail",
  });

  const { fields: drinkFields } = useFieldArray({
    control,
    name: "formData.drinks.detail",
  });

  const onSubmit = (data: any) => {
    ExcelExport(data);
    // console.log("form data >> ", data);s
  };

  const watchAllFields = watch();
  const total = watchAllFields.formData.foods.detail.reduce((total, item) => {
    return total + (item.price || 0);
  }, 0);

  useEffect(() => {
    setValue(`formData.foods.total`, total);
  }, [total]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        {/* for window */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          py={2}
          sx={{ display: { md: "flex", xs: "none" } }}
        >
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label={<Typography variant="body1">Foods</Typography>}
              {...a11yProps(0)}
            />

            <Tab
              label={<Typography variant="body1">Drinks</Typography>}
              {...a11yProps(1)}
            />
          </Tabs>

          <Controller
            name={`formData.saleDate`}
            control={control}
            render={({ field: { value, onChange, onBlur } }) => {
              return (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Sale Date"
                    format="DD/MM/YY"
                    value={dayjs(value)}
                    onChange={onChange}
                    slotProps={{
                      openPickerButton: { color: "primary" },
                      textField: {
                        sx: {
                          width: "25%",
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              );
            }}
          />
        </Stack>
        {/* for mobile */}
        <Box mb={2} sx={{ display: { md: "none", xs: "block" } }}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"
            sx={{ mb: 2 }}
          >
            <Tab
              label={<Typography variant="caption">Foods</Typography>}
              {...a11yProps(0)}
            />

            <Tab
              label={<Typography variant="caption">Drinks</Typography>}
              {...a11yProps(1)}
            />
          </Tabs>

          <Controller
            name={`formData.saleDate`}
            control={control}
            render={({ field: { value, onChange, onBlur } }) => {
              return (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Sale Date"
                    format="DD/MM/YY"
                    value={dayjs(value)}
                    onChange={onChange}
                    slotProps={{
                      openPickerButton: { color: "primary" },
                      textField: {
                        size: "small",
                        sx: {
                          width: "100%",
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              );
            }}
          />
        </Box>
      </Box>
      <CustomTabPanel value={tabValue} index={0}>
        <FoodTable
          foodFields={foodFields}
          control={control}
          setValue={setValue}
          watch={watch}
        />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={1}>
        <DrinkTable
          drinkFields={drinkFields}
          control={control}
          setValue={setValue}
          watch={watch}
        />
      </CustomTabPanel>
      <Box
        py={2}
        alignItems="center"
        justifyContent="flex-end"
        sx={{ display: "flex" }}
      >
        <Button variant="contained" type="submit" sx={{
          fontSize : {xs : 10,md:15}
        }}>
          export excel
        </Button>
      </Box>
    </form>
  );
}
