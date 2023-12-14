const express = require('express')
const fs = require("fs");
const path = require('path');
const pdf = require("pdf-creator-node");
const {removeFile} = require('../../storage/removeFile');
const {Agreement} = require('../../models/Agreement');
const dateFormat = require('date-and-time');

// Read HTML Template
const html = fs.readFileSync(path.join(__dirname, "./templates/contract.html"), "utf8");
const logoTemplate = path.join(__dirname, "./templates/logo.jpg");



const companyData = {
    provider: "Coding proactive",
    providerLocation: "Colombia",
    servicePrice: "2000USD",
    costSigning: "1000USD",
    costCompletion: "4000USD"
};

let document = (customerInfo) => {
    const now = new Date();
    const expeditionDate = dateFormat.format(now, "DD/MM/YYYY");
    const {dateAgreement, customerName, customerEmail, customerPhone, customerLocation, requirements, sign} = customerInfo;
    const dateAt = dateFormat.format(dateAgreement, "DD/MM/YYYY");

    const info = {
        dateAgreement: dateAt, 
        customerName,
        customerEmail,
        customerPhone,
        customerLocation,
        sign
    };
        
    const requirementsMod = [];
    requirements.map(requirement => {
        requirementsMod.push({
            name: requirement.name,
            description: requirement.description,
            priority: requirement.priority
        });
    });
    
    return {
        html: html,
        data: {
            expeditionDate,
            logo: logoTemplate,
            customerInfo: info,
            requirements: requirementsMod,
            companyData: companyData
        },
        path: `${__dirname}/outputs/${customerInfo.customerEmail}-${now.getTime()}.pdf`,
        type: "Buffer",
    };
}

const options = {
    format: "A3",
    orientation: "portrait",
    border: "10mm",
    header: {
        height: "45mm",
        contents: '<div style="text-align: center;">Test Agreement</div>'
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

const createPdf = (info) => {
    return pdf.create(document(info), options)
        .then((pdfRes) => {
            return pdfRes.filename;
        });
};

const generatePdf = async (req, res) => {
    const id = req.body.id;
    try {
        let contract = await Agreement.findById({_id: id}).select('-requirements._id');
        if(contract == null) return res.status(400).json(['The Agreement has not been found']);
        createPdf(contract).then((pathPdf) => {
            res.sendFile(pathPdf, (err) => {
                return express.json({ "error": err })
            });
            return pathPdf;
        }).then(removeFile);        
    } catch (error) {
        res.status(500).json([error.message]);
    }
    
}

module.exports = {generatePdf, createPdf};