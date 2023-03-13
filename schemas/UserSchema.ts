const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true
    },
    googleID:{
        type: Number
    },
    appleID:{
        type: String
    },
    uuid:{
        type: String
    },
    hash:{
        type: String
    },
    salt:{
        type: String
    },
    profileImage:{
        type: String    // This is just a link to the profile image
    },
    allergys:{
        type: [Object]
    },
    diets:{
        custom: Boolean,
        diet: String,
        foods: [String]
    },
    prefrences:{
        likes: [String],
        dislikes: [String]
    }
});

module.exports = mongoose.model('UserDB', UserSchema);