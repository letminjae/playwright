import ExcelJs from "exceljs";

const workbook = new ExcelJs.Workbook();
async function findExcelValue() {
  await workbook.xlsx.readFile(
    "/Users/chaminjae/Download/excelDownloadTest.xlsx"
  );
  const worksheet = workbook.getWorksheet("Sheet1");

  // 행-렬 모두 반복문 순회하며 cell 찾기
  worksheet?.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      // console.log(cell.value);
      if (cell.value === "apple") {
        console.log(`row is = ${rowNumber}, col is = ${colNumber}`);
      }
    });
  });
}
