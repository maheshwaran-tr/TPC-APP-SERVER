// import puppeteer from "puppeteer";
import ejs from "ejs";
import studentService from "../services/studentService.js";
import pdf from "html-pdf";
import fs from "fs/promises";

const genPdfAllStudents = async () => {
    const students = await studentService.getAllStudents();
    const studentHeaders = ["RollNo", "RegNo", "Name", "Department", "Email", "PhoneNo"];
    
    // Load EJS Template
    const htmlTemplate = await fs.readFile("assets/template.ejs", "utf-8");
    const htmlContent = ejs.render(htmlTemplate, { studentHeaders, students });
    
    return new Promise((resolve, reject) => {
        pdf.create(htmlContent, { format: 'A4' }).toBuffer((err, buffer) => {
            if (err) reject(err);
            else resolve(buffer);
        });
    });
};

// const genPdfAllStudents = async () => {
//     const students = await studentService.getAllStudents();
//     const studentHeaders = ["RollNo", "RegNo", "Name", "Department", "Email", "PhoneNo"];
//     const htmlContent = await ejs.renderFile("assets/template.ejs", { studentHeaders, students });
//     const browser = await puppeteer.launch({
//         headless: "new",
//         args: ["--no-sandbox", "--disable-setuid-sandbox"]
//     });
    
    
//     const page = await browser.newPage();
//     await page.setContent(htmlContent);
//     const pdfBuffer = await page.pdf({
//         format: 'A4',
//         printBackground: true,
//         margin: {
//             top: '10mm',
//             right: '10mm',
//             bottom: '10mm',
//             left: '10mm'
//         }
//     });
//     await browser.close();
//     return pdfBuffer;
// };


export default {genPdfAllStudents};