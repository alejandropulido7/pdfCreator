require("dotenv").config();
const express = require('express');
const form = require('./app/routes/pdf');
const img = require('./app/routes/img');

//asignar variable de entorno
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use('/api', require('./app/routes'));

app.listen(port)