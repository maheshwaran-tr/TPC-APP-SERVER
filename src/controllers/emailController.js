import emailService from "../services/emailservice.js";
import excelService from "../services/excelService.js";
import pdfService from "../services/pdfService.js";

const emailAllStudents = async (req, res, next) => {
  try {
    const { to, subject, message } = req.body;

    if (!to) {
      return res.status(400).send("Missing required fields: to");
    }

    const pdfBuffer = await pdfService.genPdfAllStudents();
    const excelBuffer = await excelService.generateExcelBuffer();

    const mailOptions = {
      from: "sitplacementapp@gmail.com", // Sender address
      to: to, // Recipient address
      subject: subject, // Email subject
      text: message, // Plain text body
      attachments: [
        {
          filename: "all_students.pdf", // Name of the attachment
          content: pdfBuffer, // PDF buffer as attachment content
          contentType: "application/pdf",
        },
        {
          filename: "all_students.xlsx", // Name of the attachment
          content: excelBuffer, // PDF buffer as attachment content
          contentType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      ],
    };

    emailService.sendmail(mailOptions);

    res.status(200).json({ to, subject, message, status: "Done" });
  } catch (error) {
    const err = new Error(`Error while sending email - ${error.message}`);
    err.status = 500;
    next(err);
  }
};

const emailAttandance = async (req, res, next) => {
  try {
    const { to, subject, message, date } = req.body;

    if (!to) {
      return res.status(400).send("Missing required fields: to");
    }

    const pdfBuffer = await pdfService.genPdfTrainingAttendance(date);

    const mailOptions = {
      from: "sitplacementapp@gmail.com", // Sender address
      to: to, // Recipient address
      subject: subject, // Email subject
      text: message, // Plain text body
      attachments: [
        {
          filename: "all_students.pdf", // Name of the attachment
          content: pdfBuffer, // PDF buffer as attachment content
          contentType: "application/pdf",
        },
      ],
    };

    emailService.sendmail(mailOptions);

    res.status(200).json({ to, subject, message, status: "Done" });
  } catch (error) {
    const err = new Error(`Error while sending email - ${error.message}`);
    err.status = 500;
    next(err);
  }
};

export default { emailAllStudents, emailAttandance };
