import ExcelJs from "exceljs";

const workbook = new ExcelJs.Workbook();
workbook.xlsx
  .readFile("/Users/chaminjae/Download/excelDownloadTest.xlsx")
  .then(function () {
    const worksheet = workbook.getWorksheet("Sheet1");
    worksheet?.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        // console.log(cell.value);
        if (cell.value === "apple"){
          console.log(rowNumber)
        }
      });
    });
  });