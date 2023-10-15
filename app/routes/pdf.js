const express = require('express')
const router = express.Router();
const { pdfCreator } = require('../controllers/pdf/pdfCreator');
const {validatorPdf} = require('../validations/validatorPdf');

router.post('/', validatorPdf, pdfCreator);

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