import React from 'react';
import dayjs, { Dayjs } from "dayjs";

export default async function ExcelExport( SaleData : any) {

  const Excel = require("exceljs");
  const { saveAs } = require("file-saver");
  const date = SaleData.formData.saleDate
  const setFileName = `Aki Daily Sales ${dayjs(date).format("DD-MM-YYYY")}`;
  const fileName = setFileName + ".xlsx";
  const wb = new Excel.Workbook();

  const font = {
    
  };

  const fontSecondary = {
    color: { argb: 'ffffff' },
    size: 11,
  }

  const bgPrimary = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "fc4141" },
  } 

  const bgSecondary = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "ffddad" },
  }
  const alignment = {
    horizontal: "center",
    vertical: "middle",
  };


  // food 
  const foodSheet = wb.addWorksheet("Foods");
  const foodData = SaleData.formData.foods.detail
  const foodTotalPrice = SaleData.formData.foods.total
  foodSheet.getColumn("A").width = 20;
  foodSheet.getColumn("A").style.alignment =alignment
  foodSheet.getColumn("B").width = 20;
  foodSheet.getColumn("B").style.alignment =alignment
  foodSheet.getColumn("C").width = 20;
  foodSheet.getColumn("C").style.alignment =alignment
  foodSheet.getCell("C2").value = `Date : ${dayjs(date).format("DD-MM-YYYY")} `;
  foodSheet.getCell("C2").style.alignment = {
    horizontal: "center",
    vertical: "middle",
  };
  foodSheet.getCell("C2").font = fontSecondary;
  foodSheet.getCell("C2").fill = bgPrimary;
   //border the header row
   foodSheet.addRow([]);
   let headerRow = ["Item", "Quantity", "Price"];
   foodSheet.addRow(headerRow);

   for (let row = 4; row <= 4; row++) {
    for (let col = 1; col <= headerRow.length; col++) {
      const cell = foodSheet.getCell(`${String.fromCharCode(64 + col)}${row}`);
      cell.font = fontSecondary;
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      cell.fill = bgPrimary;
      cell.alignment = alignment
    }
  }

  /** Setup row height for full page */
  for (let row = 4; row <= 480; row++) {
    foodSheet.getRow(row).height = 35;
  };

  const result = foodData.map((data:any)=>[
    data.item,
    data.qty,
    data.price
  ])

  
  result.forEach((row: any, index: number) => {
    const currentRow = foodSheet.getRow(index + 5);
    currentRow.values = row;
  });

  for (let row = 5; row <= result.length + 4 ; row++) {
    for (let col = 1; col <= headerRow.length; col++) {
      const cell = foodSheet.getCell(`${String.fromCharCode(64 + col)}${row}`);
      cell.font = font;
      cell.style.alignment = alignment
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    }
  }
  // for total
  const foodTotal = ["","Total",foodTotalPrice]
  const currentRow = foodSheet.getRow(result.length + 5);
  currentRow.values = foodTotal;

  for (let row = result.length + 5; row <= result.length + 5  ; row++) {
    for (let col = 2; col <= 3; col++) {
      const cell = foodSheet.getCell(`${String.fromCharCode(64 + col)}${row}`);
      cell.font = font;
      cell.style.alignment = alignment
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      cell.fill = bgSecondary
    }
  }

  // ---------------------------------------------------------------------------------------------//
  
  // drink
  const drinkSheet = wb.addWorksheet("Drinks");
  const drinkData = SaleData.formData.drinks.detail
  drinkData.map((data:any)=>{
    drinkSheet.getCell("A4").value = "drink";
  })

 
  console.log(SaleData)
  try {
    const buffer = await wb.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, fileName);
    console.log("File created:", fileName);
  } catch (error) {
    console.error("Error creating file:", error);
  }
}
