const express = require('express')
const fs = require("fs");
const path = require('path');
const pdf = require("pdf-creator-node");
const {removeFile} = require('../../storage/removeFile');

// Read HTML Template
const html = fs.readFileSync(path.join(__dirname, "./templates/contract.html"), "utf8");



const companyData = {
    provider: "Coding proactive",
    providerLocation: "Colombia",
    servicePrice: "2000USD",
    costSigning: "1000USD",
    costCompletion: "4000USD"
};

let document = (customerInfo) => {
    const now = new Date().getTime();
    return {
        html: html,
        data: {
            logo: 'logo',
            customerInfo: customerInfo,
            companyData: companyData,
        },
        path: `${__dirname}/outputs/${customerInfo.customerEmail}-${now}.pdf`,
        type: "Streams",
    };
}

const options = {
    format: "A3",
    orientation: "portrait",
    border: "10mm",
    header: {
        height: "45mm",
        contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
    },
    footer: {
        height: "28mm",
        contents: {
            first: 'Cover page',
            2: 'Second page', // Any page number is working. 1-based index
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            last: 'Last Page'
        }
    }
};

const pdfCreator = (req, res) => {
    const customerInfo = req.body;
    console.log(customerInfo);
    pdf.create(document(customerInfo), options)
        .then((pdfRes) => {
            console.log(pdfRes);
            const pathPdf = pdfRes.filename
            res.sendFile(pathPdf, (err) => {
                return express.json({ "error": err })
            });
            return pathPdf;
        }).then(removeFile);
}

module.exports.pdfCreator = pdfCreator;