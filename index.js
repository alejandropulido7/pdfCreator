require("dotenv").config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {connectDB} = require('./app/config/db');
const cookieParser = require('cookie-parser');

//asignar variable de entorno
const port = process.env.PORT || 5000;
const crossFront = process.env.FRONTEND;


connectDB();

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );
app.use(cookieParser());

app.use('/api', require('./app/routes'));

app.listen(port)