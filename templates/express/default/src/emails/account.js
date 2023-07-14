const nodemailer = require("nodemailer");
const Transport = require("nodemailer-sendinblue-transport");

const transporter = nodemailer.createTransport(
  new Transport({ apiKey: process.env.SENDINBLUE_API_KEY })
);

const sendWelcomeEmail = (email, name) => {
  //send email with transporter
  transporter.sendMail({
    to: email,
    from: process.env.EMAIL_SENDER,
    subject: "Welcome",
    text: `Welcome to the app, ${name}. Let me know how you get along with the app`,
  });
};

const sendCancellationEmail = (email, name) => {
  transporter.sendEmail({
    to: email,
    from: process.env.EMAIL_SENDER,
    subject: "Goodbye",
    text: `Goodbye ${name}. It's sad to see you go. Is there anything we could have done to keep you?`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail,
};
