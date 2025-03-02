import nodemailer from "nodemailer";

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // Use 587 for TLS
  secure: true, // true for 465, false for other ports
  auth: {
    user: "sitplacementapp@gmail.com", // Your email address
    pass: "peoq wcxy rmgl kqjs", // Your email password or app-specific password
  },
});

const sendmail = (mailOptions) => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

export default { sendmail, transporter };
