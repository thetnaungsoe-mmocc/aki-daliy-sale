"use client"
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useWatch } from "react-hook-form";
// import { ErrorMessage } from "@hookform/error-message";


type FormValues = {
  formData: {
    id: string;
    item: string;
    qty: number | null;
    price: number | null;
  }[];
};

const defaultValue = [
  {
    id : "item1",
    item :"တာကိုရာကီ"
  },
  {
    id : "item2",
    item :"တော့ပိုကီ"
  },
  {
    id : "item3",
    item :"ငါးအသားပြား"
  },
  {
    id : "item4",
    item :"ငါးပေါင်မုန့်"
  },
  {
    id : "item5",
    item :"ဟမ်ဘာကာ"
  },
  {
    id : "item6",
    item :"ငုံးဉကျော်"
  },

]


export default function MainScreen() {

function createRow(items: string, qty: number, price: number) {
  return { items, qty, price };
}

const {
  control,
  handleSubmit,
  setValue,
  reset,
  setError,
  formState: { errors },
} = useForm<FormValues>({
  defaultValues: {
    formData: defaultValue
  },
});

const { fields, append, prepend, remove, swap, move, insert, replace } =
useFieldArray({
  control,
  name: "formData",
});

const onSubmit = (data : any) => {
  console.log("form data >> ",data)
}



  return (
    <TableContainer component={Paper}>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {fields.map((field, index) => (
            <TableRow key={field.id}>
              <TableCell>{field.item}</TableCell>
              <TableCell align="right">{field.qty}</TableCell>
              <TableCell align="right">{field.price}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={2}  align='right'>Total</TableCell>
            <TableCell align="right">100000</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      </form>
    </TableContainer>
  )
}
