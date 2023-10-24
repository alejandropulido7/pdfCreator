const express = require('express');
const router = express.Router();
// const path = require('path');


router.get('/', (req,res) => {
    // res.sendFile(path.join(__dirname, '../controllers/pdf/templates/'+req.params.img+'.jpg'))
    res.sendFile(req.query.path)

});

module.exports = router;