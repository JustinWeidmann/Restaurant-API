const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name for your restaurant'],
        trim: true
    },
    showCaseImage: {
        type: String
    },
    logo: {
        type: String
    },
    chain: {
        type: Boolean,
        default: false,
    },
    companyID: {
        type: Number,
        require: false,
        trim: true
    },
    websiteURL: {
        type: String,
        trim: true
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    address: {
        type: String
    },
    location: {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point']
        },
        coordinates: {
          type: [Number],
          index: '2dsphere'
        }
    },
    menu: {
        type: Object // Should allow for freeform object so menus can be structured however is best
    },
    hours: {
        mon: {type: [Date]},
        tue: {type: [Date]},
        wed: {type: [Date]},
        thu: {type: [Date]},
        fri: {type: [Date]},
        sat: {type: [Date]},
        sun: {type: [Date]}
    },
    catagories: {
        type: [String]
    },
    cuisene: {
        type: [String]
    }
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);