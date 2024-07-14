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
import { Button, Input, Stack, TextField,Box} from "@mui/material";
import { useEffect , useState} from "react";

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
    id: "item1",
    item: "တာကိုရာကီ",
    qty: 0,
    price: null,
  },
  {
    id: "item2",
    item: "တော့ပိုကီ",
    qty: 0,
    price: null,
  },
  {
    id: "item3",
    item: "ငါးအသားပြား",
    qty: 0,
    price: null,
  },
  {
    id: "item4",
    item: "ငါးပေါင်မုန့်",
    qty: 0,
    price: null,
  },
  {
    id: "item5",
    item: "ဟမ်ဘာကာ",
    qty: 0,
    price: null,
  },
  {
    id: "item6",
    item: "ငုံးဉကျော်",
    qty: 0,
    price: null,
  },
];

function Price({ control, index ,setValue}: any){
  const value = useWatch({
    control,
    name: `formData[${index}]`,
    // defaultValue: {}
  });
  // console.log(value)
  let finalPrice = 0
  if(value.id == "item1"){
    finalPrice = value.qty
  }else if(value.id == "item2"){
    finalPrice = value.qty * 1500
  }else if(value.id == "item3"){
    finalPrice = value.qty * 1500
  }else if(value.id == "item4"){
    finalPrice = value.qty * 1500
  }else if(value.id == "item5"){
    finalPrice = value.qty * 3000 
  }else if(value.id == "item6"){
    finalPrice = value.qty * 1300
  }

  useEffect(() => {
      setValue(`formData[${index}].price` as any, finalPrice);
  },[finalPrice])

  return(
    <TableCell align="right">{finalPrice}</TableCell>
  )
}

function Total({ fields }: any){

  let total : any = 0
  fields.map((data:any)=>{
    // console.log("total >>",data)

    total = data.price + data.price
  })  
  
  return(
    <TableCell align="right">{total}</TableCell>
  )
}

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
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      formData: defaultValue,
    },
  });

  const { fields, append, prepend, remove, swap, move, insert, replace, } =
    useFieldArray({
      control,
      name: "formData",
    });

  const onSubmit = (data: any) => {
    console.log("form data >> ", data);
  };

  const watchAllFields = watch();
  const total = watchAllFields.formData.reduce((total, item) => {
    return total + (item.price || 0);
  }, 0);




  // append({
  //   id: "",
  //   item: "",
  //   qty:null,
  //   price:null
  // });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
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
            {fields.map((field, index) => (
              <TableRow key={field.id}>
                <TableCell>{field.item}</TableCell>
                <TableCell align="right">
                  <Controller
                    rules={{
                      required: "必項目です！",
                    }}
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => {
                      return (
                        <TextField
                          id="outlined-number"
                          value={value}
                          onChange={onChange}
                          size="small"
                        />
                      );
                    }}
                    name={`formData[${index}].qty` as any}
                  />
                </TableCell>
                {/* <TableCell align="right">{field.price}</TableCell> */}
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
      <Box py={2} alignItems="center" justifyContent="flex-end" sx={{display:"flex"}}>
        <Button variant="contained" type="submit">
          export excel
        </Button>
      </Box>
    </form>
  );
}
