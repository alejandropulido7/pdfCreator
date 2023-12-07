const mongoose = require('mongoose');

const validateEmail = (email) => {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}

const requirementSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true,
    }
});

const agreementSchema = new mongoose.Schema({
    dateAgreement: {
        type: Date,
        required: true,
    },
    customerName: {
        type: String,
        required: true,
    },
    customerEmail: {
        type: String,
        trim: true,
        lowercase: true,
        required: 'Email address is required',
        unique: false
        // validate: [validateEmail, 'Please fill a valid email address']
    },
    customerPhone: {
        type: String,
        required: true
    },
    customerLocation: {
        type: String,
        required: true
    },
    requirements: {
        type: [requirementSchema],
        required: true
    },
    sign: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

module.exports.Agreement = mongoose.model('Agreement', agreementSchema);