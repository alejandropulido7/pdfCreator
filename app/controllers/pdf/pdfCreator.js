const fs = require("fs");
const path = require('path');


// Read HTML Template
const html = fs.readFileSync(path.join(__dirname, "./templates/contract.html"), "utf8");


let document = (services, basicInfo) => {
    const now = new Date().getTime();
    return document = {
        html: html,
        data: {
            logo: 'logo',
            basicInfo: basicInfo,
            services: services,
        },
        path: `${__dirname}/outputs/${basicInfo.customer}-${now}.pdf`,
        type: "Streams",
    };
}

var options = {
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

module.exports.document = document;
module.exports.options = options;