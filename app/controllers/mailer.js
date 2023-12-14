const nodemailer = require("nodemailer");
const {removeFile} = require("../storage/removeFile");
const {createPdf} = require("../controllers/pdf/pdfCreator");
const {Agreement} = require('../models/Agreement');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

const text = (name) => {
    return `Hi ${name}, We have sent you an attached file with your contract in pdf format.`;
};  
const SUBJECT = "Service Agreement Generated";



const sendMail = async (req, res) => {
  try {
    const contract = await Agreement.findById({_id: req.body.idAgreement});
    if(contract == null) return res.status(400).json(['The Agreement has not been found']);

    createPdf(contract).then((pdfPath) => {
        transporter.sendMail({
          from: '"Coding Proactive" <codingproactive@gmail.com>',
          to: req.body.sendTo,
          subject: SUBJECT,
          text: text(contract.customerName),
          attachments: [{
              filename: 'agreement.pdf',
              path: pdfPath
          }]
        }).then((info) => {
            res.status(200).json({message: 'Email has been sent to '+info.envelope.to})
        }).catch((error) => {
            return res.status(400).json(['An error occurred while sending email: '+error]);
        });
        return pdfPath;
    }).then(removeFile);
  } catch (error) {
    return res.status(400).json(['An error occurred while pdf has been created: '+error]);
  }
}

module.exports.sendMail = sendMail;