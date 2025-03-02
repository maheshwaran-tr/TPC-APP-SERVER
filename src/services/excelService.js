import ExcelJS from "exceljs";
import studentServices from "../services/studentService.js";

const generateExcelBuffer = async () => {
  try {
    const students = await studentServices.getAllStudents();

    const data = students.map((student, index) => ({
      SNo: index + 1,
      RollNo: student.rollno,
      RegNo: student.regno,
      StudentName: student.name,
      Mark10th: student.score_10th,
      Mark12th: student.score_12th,
      CGPA: student.cgpa,
      EmailId: student.email,
      PhoneNumber: student.phone_number,
    }));

    // Create a new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Students");

    // Add Title ROW 1
    worksheet.mergeCells("A1:I1");
    const titleCell = worksheet.getCell("A1");
    titleCell.value = "Student List";
    titleCell.font = { size: 14, bold: true };
    titleCell.alignment = { vertical: "middle", horizontal: "center" };

    // Add Export Date ROW 2
    worksheet.getCell("A2").value = `Export Date: ${new Date().toLocaleDateString()}`;
    worksheet.getCell("A2").font = { italic: true };

    // Add Header Row
    worksheet.addRow([
      "S.No",
      "Roll No",
      "Reg No",
      "Student Name",
      "10th Mark",
      "12th Mark",
      "CGPA",
      "Email ID",
      "Phone Number",
    ]);

    // Set Column Widths
    worksheet.columns = [
      { key: "SNo", width: 6 },
      { key: "RollNo", width: 10 },
      { key: "RegNo", width: 15 },
      { key: "StudentName", width: 25 },
      { key: "Mark10th", width: 10 },
      { key: "Mark12th", width: 10 },
      { key: "CGPA", width: 8 },
      { key: "EmailId", width: 25 },
      { key: "PhoneNumber", width: 15 },
    ];

    // Style Header Row
    const headerRow = worksheet.getRow(3);
    headerRow.eachCell((cell) => {
      cell.alignment = { horizontal: "center", vertical: "middle" };
      cell.font = { bold: true, color: { argb: "FFFFFF" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "0070C0" },
      };
    });

    // Add Data Rows
    worksheet.addRows(data);

    // Generate Excel Buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  } catch (error) {
    throw new Error(`Error generating Excel file: ${error.message}`);
  }
};

export default { generateExcelBuffer };