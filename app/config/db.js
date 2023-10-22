const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://admin:pass123@localhost:27017', {dbName: 'pdfcreator'});
        console.log("Connect db successfuly")
    } catch (error) {
        console.log(error);
    } 
}; 

module.exports = {connectDB}