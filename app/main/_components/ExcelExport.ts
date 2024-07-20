import React from 'react';
import dayjs, { Dayjs } from "dayjs";

export default async function ExcelExport( SaleData : any) {

  const Excel = require("exceljs");
  const { saveAs } = require("file-saver");
  const date = SaleData.formData.saleDate
  const setFileName = `Aki Daily Sales ${dayjs(date).format("DD-MM-YYYY")}`;
  const fileName = setFileName + ".xlsx";
  const wb = new Excel.Workbook();

  const fontPrimary = {
    color: { argb: '000000' },
    size: 11,
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

  const border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };

  const width = 20



  // food 
  const foodSheet = wb.addWorksheet("Foods");
  const foodData = SaleData.formData.foods.detail
  const foodTotalPrice = SaleData.formData.foods.total
  foodSheet.getColumn("A").width = width;
  foodSheet.getColumn("A").style.alignment =alignment
  foodSheet.getColumn("B").width = width;
  foodSheet.getColumn("B").style.alignment =alignment
  foodSheet.getColumn("C").width = width;
  foodSheet.getColumn("C").style.alignment =alignment
  foodSheet.getCell("C2").value = `Date : ${dayjs(date).format("DD-MM-YYYY")} `;
  foodSheet.getCell("C2").style.alignment = alignment
  foodSheet.getCell("C2").font = fontSecondary;
  foodSheet.getCell("C2").fill = bgPrimary;
   //border the header row
   let foodHeaderRow = ["Item", "Quantity", "Price"];
   foodSheet.addRow([]);
   foodSheet.addRow(foodHeaderRow);

   for (let row = 4; row <= 4; row++) {
    for (let col = 1; col <= foodHeaderRow.length; col++) {
      const cell = foodSheet.getCell(`${String.fromCharCode(64 + col)}${row}`);
      cell.font = fontSecondary;
      cell.border = border
      cell.fill = bgPrimary;
      cell.alignment = alignment
    }
  }

  /** Setup row height for full page */
  for (let row = 4; row <= 480; row++) {
    foodSheet.getRow(row).height = 35;
  };

  const foodResult = foodData.map((data:any)=>[
    data.item,
    data.qty,
    data.price
  ])
  
  foodResult.forEach((row: any, index: number) => {
    const currentRow = foodSheet.getRow(index + 5);
    currentRow.values = row;
  });

  for (let row = 5; row <= foodResult.length + 4 ; row++) {
    for (let col = 1; col <= foodHeaderRow.length; col++) {
      const cell = foodSheet.getCell(`${String.fromCharCode(64 + col)}${row}`);
      cell.font = fontPrimary;
      cell.style.alignment = alignment
      cell.border = border
    }
  }
  // for total
  const foodTotal = ["","Total",foodTotalPrice]
  const currentRow = foodSheet.getRow(foodResult.length + 5);
  currentRow.values = foodTotal;

  for (let row = foodResult.length + 5; row <= foodResult.length + 5  ; row++) {
    for (let col = 2; col <= 3; col++) {
      const cell = foodSheet.getCell(`${String.fromCharCode(64 + col)}${row}`);
      cell.font = fontPrimary;
      cell.style.alignment = alignment
      cell.border = border
      cell.fill = bgSecondary
    }
  }

  // ---------------------------------------------------------------------------------------------//

  // drink
  const drinkSheet = wb.addWorksheet("Drinks");
  const drinkData =  SaleData.formData.drinks.detail
  const drinkTotalPrice = SaleData.formData.drinks.total
  drinkSheet.getColumn("A").width = width;
  drinkSheet.getColumn("A").style.alignment =alignment
  drinkSheet.getColumn("B").width = width;
  drinkSheet.getColumn("B").style.alignment =alignment
  drinkSheet.getColumn("C").width = width;
  drinkSheet.getColumn("C").style.alignment =alignment
  drinkSheet.getColumn("D").width = width;
  drinkSheet.getColumn("D").style.alignment =alignment
  
  drinkSheet.getCell("D2").value = `Date : ${dayjs(date).format("DD-MM-YYYY")} `;
  drinkSheet.getCell("D2").style.alignment = alignment
  drinkSheet.getCell("D2").font = fontSecondary;
  drinkSheet.getCell("D2").fill = bgPrimary;

  const drinkHeaderRow = ["Item","Normal","Soda","Price"]
  drinkSheet.addRow([]);
  drinkSheet.addRow(drinkHeaderRow);

  for (let row = 4; row <= 4; row++) {
    for (let col = 1; col <= drinkHeaderRow.length; col++) {
      const cell = drinkSheet.getCell(`${String.fromCharCode(64 + col)}${row}`);
      cell.font = fontSecondary;
      cell.border = border
      cell.fill = bgPrimary;
      cell.alignment = alignment
    }
  }

  for (let row = 4; row <= 480; row++) {
    drinkSheet.getRow(row).height = 35;
  };

  const drinkResult = drinkData.map((data:any)=>[
    data.item,
    data.normal,
    data.soda,
    data.price
  ])

  drinkResult.forEach((row: any, index: number) => {
    const currentRow = drinkSheet.getRow(index + 5);
    currentRow.values = row;
  });

  for (let row = 5; row <= drinkResult.length + 4 ; row++) {
    for (let col = 1; col <= drinkHeaderRow.length; col++) {
      const cell = drinkSheet.getCell(`${String.fromCharCode(64 + col)}${row}`);
      cell.font = fontPrimary;
      cell.style.alignment = alignment
      cell.border = border

      if (col === 3 && drinkResult[row - 5][2] === null) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'c9c9c9' }  // Red color
        };
      }
    }
  }

    // for total
    const drinkToal = ["","","Total",drinkTotalPrice]
    const currentRow2 = drinkSheet.getRow(drinkResult.length + 5);
    currentRow2.values = drinkToal;

    for (let row = drinkResult.length + 5; row <= drinkResult.length + 5  ; row++) {
      for (let col = 3; col <= 4; col++) {
        const cell = drinkSheet.getCell(`${String.fromCharCode(64 + col)}${row}`);
        cell.font = fontPrimary;
        cell.style.alignment = alignment
        cell.border = border
        cell.fill = bgSecondary
      }
    }


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
