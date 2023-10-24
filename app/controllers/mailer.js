const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: 'codingproactive@gmail.com',
    pass: 'ymao dqaf cldh mvxj'
  }
});

transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

const sendMail = (req, res, next) => {
    console.log(req.file);
  console.log(req.body);
  next()
  transporter.sendMail({
    from: '"Service Agreement - Coding Proactive" <codingproactive@gmail.com>',
    to: req.body.sendTo,
    subject: req.body.subject,
    text: req.body.body,
    html: "<b>Hello world?</b>"
  }).then((info) => {
      console.log("Message sent: ", info);
      res.json({'message: ': 'Email sent to '+info.envelope.to})
  }).catch((err) => {
        console.log(err);
        next();
  });
}

module.exports.sendMail = sendMail;