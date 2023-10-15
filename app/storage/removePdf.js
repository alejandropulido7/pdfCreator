const fs = require("fs").promises;

const removePdf = (pdfPath) => {
    setTimeout(() => {
        fs.unlink(pdfPath)
        .then(() => {
            console.log(`File ${pdfPath} removed`)
        }).catch(err => {
            console.error('Something wrong happened removing the file', err)
        })
    }, 5000);  
}

module.exports = { removePdf }