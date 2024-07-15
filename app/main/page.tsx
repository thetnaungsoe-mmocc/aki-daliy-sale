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
import { Button, Input, Stack, TextField, Box } from "@mui/material";
import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { FormValues, FormValues2, TabPanelProps } from "./type";
import { defaultValue, defaultValue2 } from "./const";
import FoodTable from "./_components/FoodTable";

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
  } = useForm<FormValues2>({
    defaultValues: {
      formData: defaultValue2,
    },
  });

  const { fields: foodFields } = useFieldArray({
    control,
    name: "formData.foods.detail",
  });

  const { fields: drinkFields } = useFieldArray({
    control,
    name: "formData.foods.detail",
  });

  const onSubmit = (data: any) => {
    console.log("form data >> ", data);
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
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Foods" {...a11yProps(0)} />
          <Tab label="Drinks" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={tabValue} index={0}>
        <FoodTable
          foodFields={foodFields}
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
        <Button variant="contained" type="submit">
          export excel
        </Button>
      </Box>
    </form>
  );
}
