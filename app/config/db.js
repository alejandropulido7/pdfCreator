const mongoose = require('mongoose');

const url = process.env.URL_DB;

const connectDB = async () => {
    try {
        await mongoose.connect(url, {dbName: 'pdfcreator'});
        console.log("Connect db successfuly")
    } catch (error) {
        console.log(error);
    } 
}; 

module.exports = {connectDB}