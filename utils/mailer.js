const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

/**
 * senderPhone and senderName are optional.
 */
const formatEmail = ({ senderName, senderPhone, comments }) => {
  const from = senderName ? `From ${senderName}` : '';
  const phone = senderPhone ? `Phone ${senderPhone}` : '';
  return `
  <div style="
    border: 1px solid black;
    padding: 10px;
    font-size: 15px;
    line-height: 2;
    font-family: sans-serif;
  ">
    <p>Hello, </p>
    <p>${comments}</p>
    <p>${from}</p>
    <p>${phone}</p>
  </div>
`;
};

exports.transporter = transporter;
exports.formatEmail = formatEmail;
