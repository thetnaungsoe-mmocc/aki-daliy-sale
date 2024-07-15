"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
    Control,
    UseFieldArrayReturn,
    Path,
    SetValueConfig,
    useForm,
    useFieldArray,
    Controller,
  } from 'react-hook-form';
import { useWatch } from "react-hook-form";
import { Button, Input, Stack, TextField,Box} from "@mui/material";
import { useEffect , useState} from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { FormValues2 } from '../type';

interface DrinkTableProps {
    drinkFields: UseFieldArrayReturn<FormValues2, 'formData.drinks.detail'>['fields'];
    control: Control<FormValues2>;
    setValue: (
      name: Path<FormValues2>,
      value: any,
      options?: SetValueConfig
    ) => void;
    watch: (names?: Path<FormValues2> | Path<FormValues2>[] | string | string[]) => any;
  }

export default function DrinkTable({drinkFields,control,setValue,watch} : DrinkTableProps) {
  return (
    <div>DrinkTable</div>
  )
}
