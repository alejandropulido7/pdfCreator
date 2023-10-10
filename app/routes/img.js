const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/:img', (req,res) => {
    res.sendFile(path.join(__dirname, '../controllers/pdf/templates/'+req.params.img+'.jpg'))
});

module.exports = router;