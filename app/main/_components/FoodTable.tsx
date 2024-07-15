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

interface FoodTableProps {
    foodFields: UseFieldArrayReturn<FormValues2, 'formData.foods.detail'>['fields'];
    control: Control<FormValues2>;
    setValue: (
      name: Path<FormValues2>,
      value: any,
      options?: SetValueConfig
    ) => void;
    watch: (names?: Path<FormValues2> | Path<FormValues2>[] | string | string[]) => any;
  }

function Price({ control, index ,setValue}: any){
    const value = useWatch({
      control,
      name: `formData.foods.detail[${index}]`,
      // defaultValue: {}
    });
    let qty = value.qty
    let finalPrice = 0
    if(value.id == "item1"){
      finalPrice = qty * 2500
    }else if(value.id == "item2"){
      finalPrice = qty * 1500
    }else if(value.id == "item3"){
      finalPrice = qty * 1500
    }else if(value.id == "item4"){
      finalPrice = qty * 1500
    }else if(value.id == "item5"){
      finalPrice = qty * 3000 
    }else if(value.id == "item6"){
      finalPrice = qty * 1300
    }
  
    useEffect(() => {
        setValue(`formData.foods.detail[${index}].price` as any, finalPrice);
    },[finalPrice])
  
    return(
      <TableCell align="right">{finalPrice}</TableCell>
    )
  }
  

export default function FoodTable( {foodFields,control,setValue,watch} : FoodTableProps) {

    const watchAllFields = watch();
    const total = watchAllFields.formData.foods.detail.reduce((total : any, item : any) => {
      return total + (item.price || 0);
    }, 0);
  
      useEffect(() => {
        setValue(`formData.foods.total`, total);
    },[total])
  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="spanning table">
      <TableHead>
        <TableRow>
          <TableCell>Item</TableCell>
          <TableCell align="right">Quantity</TableCell>
          <TableCell align="right">Price</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {foodFields.map((field, index) => (
          <TableRow key={field.id}>
            <TableCell>{field.item}</TableCell>
            <TableCell align="right">
                <Controller
                  rules={{
                    required: 'Required field!',
                  }}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      id="outlined-number"
                      value={value}
                      onChange={(e) => onChange(Number(e.target.value))}
                      size="small"
                    />
                  )}
                  name={`formData.foods.detail[${index}].qty` as any}
                />
              </TableCell>
            <Price control={control} index={index} setValue={setValue}/>
          </TableRow>
        ))}
        <TableRow>
          <TableCell colSpan={2} align="right">
            Total
          </TableCell>
          <TableCell align="right">{total}</TableCell>
          {/* <Total fields ={fields}/> */}
        </TableRow>
      </TableBody>
    </Table>

    {/* <Stack> */}

    {/* </Stack> */}
  </TableContainer>
  )
}
