/**
 * senderPhone and senderName are optional.
 */
const formatEmail = ({ senderName, senderPhone, senderEmail, comments }) => {
  const from = senderName ? `From ${senderName}` : '';
  const phone = senderPhone ? `Phone: ${senderPhone}` : '';
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
    <p>Email: ${senderEmail}</p>
    <p>${phone}</p>
  </div>
`;
};

exports.formatEmail = formatEmail;
