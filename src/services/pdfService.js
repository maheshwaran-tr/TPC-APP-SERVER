// import puppeteer from "puppeteer";
import ejs from "ejs";
import studentService from "../services/studentService.js";
import pdf from "html-pdf";
import fs from "fs/promises";
import trainingService from "./trainingService.js";

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


const genPdfTrainingAttendance = async (requestedDate) => {
    try {
        const students = await studentService.getAllStudents();
        const trainings = await trainingService.getAllTrainings(); // Fetch all trainings
        
        const formattedDate = new Date(requestedDate).toISOString().split("T")[0]; // Extract YYYY-MM-DD

        // Find training attendance records matching the requested date
        let attendanceRecords = [];
        
        trainings.forEach(training => {
            training.training_attendance.forEach(attendance => {
                const trainingDate = new Date(attendance.training_date).toISOString().split("T")[0];
                if (trainingDate === formattedDate) {
                    const student = students.find(s => s.student_id === attendance.student_id);
                    if (student) {
                        attendanceRecords.push({
                            rollNo: student.rollno, 
                            name: student.name,
                            department: student.department.name,
                            status: attendance.status
                        });
                    }
                }
            });
        });

        // Sort attendance records by roll number
        attendanceRecords.sort((a, b) => a.rollNo - b.rollNo);

        // Define table headers
        const headers = ["RollNo", "Name", "Department", "Status"];

        // Load EJS template for PDF
        const htmlTemplate = await fs.readFile("assets/attendance_template.ejs", "utf-8");
        const htmlContent = ejs.render(htmlTemplate, { headers, attendanceRecords, formattedDate });

        // Generate and return PDF buffer
        return new Promise((resolve, reject) => {
            pdf.create(htmlContent, { format: 'A4' }).toBuffer((err, buffer) => {
                if (err) reject(err);
                else resolve(buffer);
            });
        });

    } catch (error) {
        throw new Error("Error generating PDF: " + error.message);
    }
};



export default {genPdfAllStudents, genPdfTrainingAttendance};