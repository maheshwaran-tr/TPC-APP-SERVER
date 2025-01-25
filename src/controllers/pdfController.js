import puppeteer from 'puppeteer';
import ejs from 'ejs';
import studentService from '../services/studentService.js';

// Route to generate PDF and send as response
const genPdf = async (req, res) => {
    try {
        // Fetch student data
        const students = await studentService.getAllStudents();

        // Additional data for the PDF
        const title = "SETU INSTITUTE OF TECHNOLOGY";
        const description = "List of Students in CSD Department";
        const collegeName = "SETU INSTITUTE OF TECHNOLOGY";

        // Render HTML using EJS template and pass student data
        const htmlContent = await ejs.renderFile("assets\\template.ejs", { students, title, description, collegeName });
        // Launch Puppeteer and generate the PDF from the rendered HTML
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent);

        // Generate PDF in memory
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

        // Set response headers for PDF content type
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=student_report.pdf');

        // Send the PDF buffer as the response
        res.end(pdfBuffer); // Using res.end() to send binary data (buffer) correctly

        console.log('PDF generated and sent successfully.');
    } catch (err) {
        console.error('Error generating PDF:', err);
        res.status(500).send('An error occurred while generating the PDF');
    }
};

export default { genPdf };
