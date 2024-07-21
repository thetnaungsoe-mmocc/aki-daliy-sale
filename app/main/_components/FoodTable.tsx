"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
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
import {
  Button,
  Input,
  Stack,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { FormValues } from "../type";
import { styled } from "@mui/material/styles";
import { StyledTableCell, StyledTableRow } from "./CustomTableStyle";
import { ErrorMessage } from "@hookform/error-message";

interface FoodTableProps {
  foodFields: UseFieldArrayReturn<
    FormValues,
    "formData.foods.detail"
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
    name: `formData.foods.detail[${index}]`,
    // defaultValue: {}
  });
  let qty = value.qty;
  let finalPrice = 0;
  if (value.id == "food1") {
    finalPrice = qty * 2500;
  } else if (value.id == "food2") {
    finalPrice = qty * 1500;
  } else if (value.id == "food3") {
    finalPrice = qty * 1500;
  } else if (value.id == "food4") {
    finalPrice = qty * 1500;
  } else if (value.id == "food5") {
    finalPrice = qty * 3000;
  } else if (value.id == "food6") {
    if (qty % 2 === 0) {
      finalPrice = qty * 1250;
    } else if (qty % 2 !== 0) {
      finalPrice = (qty - 1) * 1250 + 1300;
    }
  }

  useEffect(() => {
    setValue(`formData.foods.detail[${index}].price` as any, finalPrice);
  }, [finalPrice]);

  return <TableCell align="right">{finalPrice}</TableCell>;
}

export default function FoodTable({
  foodFields,
  control,
  setValue,
  watch,
}: FoodTableProps) {
  const watchAllFields = watch();
  const total = watchAllFields.formData.foods.detail.reduce(
    (total: any, item: any) => {
      return total + (item.price || 0);
    },
    0
  );

  useEffect(() => {
    setValue(`formData.foods.total`, total);
  }, [total]);
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ width: { md: "100%", xs: "100%" } }}
        aria-label="spanning table"

      >
        <TableHead>
          <TableRow>
            <StyledTableCell>Item</StyledTableCell>
            <StyledTableCell
              sx={{
                textAlign: {
                  xs: "left",
                  md: "right",
                },
              }}
            >
              Quantity
            </StyledTableCell>
            <StyledTableCell  sx={{
                textAlign: {
                  xs: "left",
                  md: "right",
                },
              }}>Price</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {foodFields.map((field, index) => (
            <StyledTableRow key={field.id}>
              <StyledTableCell>{field.item}</StyledTableCell>
              <StyledTableCell sx={{
                textAlign: {
                  xs: "left",
                  md: "right",
                },
              }}>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
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
                      inputProps={{ inputMode: "numeric" }}
                      sx={{width:{xs:'60%',md:"30%"}}}
                    />
                  )}
                  name={`formData.foods.detail[${index}].qty` as any}
                />
              </StyledTableCell >
              <Price control={control} index={index} setValue={setValue} />
            </StyledTableRow>
          ))}
          <TableRow>
            <StyledTableCell colSpan={2} align="right">
              Total
            </StyledTableCell>
            <StyledTableCell align="right">{total}</StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
