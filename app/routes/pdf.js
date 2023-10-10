const express = require('express')
const router = express.Router();
const pdfConfig = require('../controllers/pdf/pdfCreator');
const pdf = require("pdf-creator-node");
const fs = require("fs").promises;

let services = [
    {
        name: "Design UX/UI",
        cost: "500USD",
    },
    {
        name: "Monolitic App 10% Complex",
        cost: "1000USD",
    },
    {
        name: "Backend & Frontend App",
        cost: "1500USD",
    },
];

const basicInfoData = [
    'dateAgreement',
    'customer',
    'customerLocation',
    'provider',
    'providerLocation',
    'servicePrice',
    'costSigning',
    'costCompletion'
];

router.post('/', (req, res) => {
    const basicInfo = req.body;
    console.log(basicInfo);
    pdf.create(pdfConfig.document(services, basicInfo), pdfConfig.options)
        .then((pdfRes) => {
            console.log(pdfRes);
            const pathPdf = pdfRes.filename
            res.download(pathPdf, (err) => {
                return express.json({ "error": err })
            });
            return pathPdf;
        })
        .then((pdf) => {
            setTimeout(() => {
                fs.unlink(pdf)
                .then(() => {
                    console.log(`File ${pdf} removed`)
                }).catch(err => {
                    console.error('Something wrong happened removing the file', err)
                })
            }, 5000);            
        });
})

//Obtener parametros de GET en la request
// router.get('/:id', (req,res) => {
//     let car = cars.find(car => car.id == req.params.id);
//     res.send(car);
// })

// //Para acceder a los datos de body, solo se accede a body y luego al nombre de la propiedad que se envia
// router.post('/',(req,res)=>{
//     let idCard = cars.length+1;
//     let car = {
//         id: idCard, 
//         company: req.body.company, 
//         model: req.body.model, 
//         year: req.body.year
//     };
//     cars.push(car);
//     res.send(car);
// })

module.exports = router;