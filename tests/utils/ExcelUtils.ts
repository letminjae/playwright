import ExcelJs from "exceljs";

interface Change {
  changeRow: number;
  changeCol: number;
}

const workbook = new ExcelJs.Workbook();

async function writeExcelValue(
  searchText: string,
  replaceText: string | number,
  filepath: string,
  change: Change
) {
  await workbook.xlsx.readFile(filepath);
  const worksheet = workbook.getWorksheet("Sheet1");

  const output = await switchExcelValue(worksheet, searchText);

  const cell = worksheet?.getCell(
    output.row + change.changeRow,
    output.col + change.changeCol
  );
  if (cell) {
    cell.value = replaceText;
  }

  // 수정된 내용으로 저장
  await workbook.xlsx.writeFile(filepath);
}

async function switchExcelValue(worksheet, searchText: string) {
  let output = { row: 0, col: 0 };

  // 행-렬 모두 반복문 순회하며 cell 찾기
  worksheet?.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      // console.log(cell.value, colNumber);
      if (cell.value === searchText) {
        console.log(`row is = ${rowNumber}, col is = ${colNumber}`);
        output.row = rowNumber;
        output.col = colNumber;
      }
    });
  });
  return output;
}

export default writeExcelValue;
