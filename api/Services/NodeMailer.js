import nodemailer from 'nodemailer';

// Create the nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use secure:true for port 465
  auth: {
    user: "shoyabkhan.smartdata@gmail.com", // Use environment variables for security
    pass: 'rmamg',
  },
});



// Function to send emails
const sendMail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: 'shoyabkhan.smartdata@gmail.com',
      to,
      subject,
      html,
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendMail;
