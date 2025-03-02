import puppeteer from "puppeteer";
import ejs from "ejs";
import studentService from "../services/studentService.js";

const genPdfAllStudents = async () => {
    const students = await studentService.getAllStudents();
    const studentHeaders = ["RollNo", "RegNo", "Name", "Department", "Email", "PhoneNo"];
    const htmlContent = await ejs.renderFile("assets\\template.ejs", { studentHeaders, students });
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
            top: '10mm',
            right: '10mm',
            bottom: '10mm',
            left: '10mm'
        }
    });
    await browser.close();
    return pdfBuffer;
};


export default {genPdfAllStudents};