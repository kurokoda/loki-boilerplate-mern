const nodemailer = require('nodemailer');

// TODO add these properties to environment vars
const transport = nodemailer.createTransport({
  auth: {
    type: 'OAuth2',
    user: process.env.KLAW_EMAIL_USER,
    accessToken: process.env.KLAW_EMAIL_ACCESS_TOKEN
  },
  host: 'smtp.gmail.com',
  port: 465,
  secure: true
});

export const sendPasswordResetEmail = (email, token) => {
  // if (process.env.NODE_ENV !== 'production') {
  //   return;
  // }

  const tokenUrl = `${
    process.env.REACT_APP_KLAW_API_BASE_URL
  }password-reset?token=${process.env.REACT_APP_KLAW_API_BASE_URL}`;

  const options = {
    from: process.env.KLAW_EMAIL_USER,
    html: `<p style="{color:red}">Hello beloved beast <a href=${tokenUrl}>Please visit our site to reset your password</a></p>`,
    subject: 'Your password reset request',
    text: `Please visit our site at ${tokenUrl} to reset your password.`,
    to: email
  };

  transport.sendMail(options, (err, info) => {
    err ? console.log(err) : console.log(info);
  });
};
