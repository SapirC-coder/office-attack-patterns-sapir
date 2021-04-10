const mongoose = require('mongoose');

module.exports = mongoose.model(
    "Base",
    mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        _id: {
            type: String,
            required: true
        },
        x_mitre_platforms: {
            type: String,
            required: true
        },
        x_mitre_detection: {
            type: String,
            required: true
        },
        phase_name: {
            type: String,
            required: true
        },
      }, {_id: false})
); 
