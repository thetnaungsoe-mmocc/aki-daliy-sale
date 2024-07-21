"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
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
} from "react-hook-form";
import { useWatch } from "react-hook-form";
import { Button, Input, Stack, TextField, Box } from "@mui/material";
import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { FormValues } from "../type";
import { styled } from '@mui/material/styles';
import { StyledTableCell,StyledTableRow } from "./CustomTableStyle";


interface DrinkTableProps {
  drinkFields: UseFieldArrayReturn<
    FormValues,
    "formData.drinks.detail"
  >["fields"];
  control: Control<FormValues>;
  setValue: (
    name: Path<FormValues>,
    value: any,
    options?: SetValueConfig
  ) => void;
  watch: (
    names?: Path<FormValues> | Path<FormValues>[] | string | string[]
  ) => any;
}

function Price({ control, index, setValue }: any) {
  const value = useWatch({
    control,
    name: `formData.drinks.detail[${index}]`,
    // defaultValue: {}
  });
  const normal = value.normal;
  const soda = value.soda;
  let finalPrice = 0;
  if (value.id == "drink1" || (value.id == "drink2" && soda == null)) {
    finalPrice = normal * 2000;
  } else if (
    value.id == "drink3" ||
    value.id == "drink4" ||
    (value.id == "drink5" && soda == null)
  ) {
    finalPrice = normal * 2500;
  } else {
    finalPrice = normal * 1500 + soda * 2000;
  }

  useEffect(() => {
    setValue(`formData.drinks.detail[${index}].price` as any, finalPrice);
  }, [finalPrice]);

  return <TableCell align="right">{finalPrice}</TableCell>;
}

export default function DrinkTable({
  drinkFields,
  control,
  setValue,
  watch,
}: DrinkTableProps) {

  const watchAllFields = watch();
  const total = watchAllFields.formData.drinks.detail.reduce((total : any, item : any) => {
    return total + (item.price || 0);
  }, 0);

    useEffect(() => {
      setValue(`formData.drinks.total`, total);
  },[total])
  return (
    <TableContainer component={Paper}>
      {/* for pc */}
      <Table sx={{display:{md:'table',xs:"none"}}} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Item</StyledTableCell>
            <StyledTableCell align="center">
              Normal
            </StyledTableCell>
            <StyledTableCell align="center">
              Soda
            </StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {drinkFields.map((field, index) => (
            <StyledTableRow key={field.id}>
              <TableCell>{field.item}</TableCell>
              <TableCell align="center">
                <Controller
                  rules={{
                    required: "Required field!",
                  }}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      label="Normal"
                      id="outlined-number"
                      value={value}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        // Validate and convert input to number if it's a valid number
                        if (/^[+-]?(\d+(\.\d*)?|\.\d+)?$/.test(inputValue)) {
                          onChange(Number(inputValue));
                        }
                      }}
                      size="small"
                      inputProps={{ inputMode: 'numeric' }}
                    />
                  )}
                  name={`formData.drinks.detail[${index}].normal` as any}
                />
              </TableCell>
              {field.soda != null ? (
                <TableCell align="center">
                  <Controller
                    rules={{
                      required: "Required field!",
                    }}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                       label="Soda"
                        id="outlined-number"
                        value={value}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          // Validate and convert input to number if it's a valid number
                          if (/^[+-]?(\d+(\.\d*)?|\.\d+)?$/.test(inputValue)) {
                            onChange(Number(inputValue));
                          }
                        }}
                        size="small"
                        inputProps={{ inputMode: 'numeric' }}
                      />
                    )}
                    name={`formData.drinks.detail[${index}].soda` as any}
                  />
                </TableCell>
              ) : (
                <TableCell></TableCell>
              )}
              <Price control={control} index={index} setValue={setValue} />
            </StyledTableRow>
          ))}
          <TableRow>
          <TableCell colSpan={3} align="right">
            Total
          </TableCell>
          <TableCell align="right">{total}</TableCell>
        </TableRow>
        </TableBody>
      </Table>

      {/* for mobile */}
      <Table sx={{display:{md:'none',xs:"table"},width:"100%"}} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Item</StyledTableCell>
            <StyledTableCell  sx={{
                textAlign: {
                  xs: "left",
                  md: "right",
                },
              }}>
              Quantity
            </StyledTableCell>
            <StyledTableCell sx={{
                textAlign: {
                  xs: "left",
                  md: "right",
                },
              }}>Price</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {drinkFields.map((field, index) => (
            <StyledTableRow key={field.id}>
              <TableCell>{field.item}</TableCell>
              <TableCell sx={{
                textAlign: {
                  xs: "left",
                  md: "right",
                },
              }}>
                <Controller
                  rules={{
                    required: "Required field!",
                  }}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      label="Normal"
                      id="outlined-number"
                      value={value}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        // Validate and convert input to number if it's a valid number
                        if (/^[+-]?(\d+(\.\d*)?|\.\d+)?$/.test(inputValue)) {
                          onChange(Number(inputValue));
                        }
                      }}
                      size="small"
                      inputProps={{ inputMode: 'numeric' }}
                      sx={{width:{xs:'60%',md:"30%"}}}
                    />
                  )}
                  name={`formData.drinks.detail[${index}].normal` as any}
                />
                {field.soda != null && 
                <Controller
                    rules={{
                      required: "Required field!",
                    }}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                       label="Soda"
                        id="outlined-number"
                        value={value}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          // Validate and convert input to number if it's a valid number
                          if (/^[+-]?(\d+(\.\d*)?|\.\d+)?$/.test(inputValue)) {
                            onChange(Number(inputValue));
                          }
                        }}
                        size="small"
                        inputProps={{ inputMode: 'numeric' }}
                        sx={{mt:2,width:{xs:'60%',md:"30%"}}}
                      />
                    )}
                    name={`formData.drinks.detail[${index}].soda` as any}
                  />
                }
              </TableCell>
          
              <Price control={control} index={index} setValue={setValue} />
            </StyledTableRow>
          ))}
          <TableRow>
          <TableCell colSpan={2} align="right">
            Total
          </TableCell>
          <TableCell align="right">{total}</TableCell>
        </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
