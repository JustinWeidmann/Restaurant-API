const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    company_name:{
        type: String,
        require: true,
        unique: true
    },
    cid:{
        type: mongoose.ObjectId
    },
    restaurants:{
        type: [mongoose.ObjectId]
    }
});

module.exports = mongoose.model('CompanyDB', CompanySchema);