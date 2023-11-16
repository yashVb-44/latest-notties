const mongoose = require('mongoose');

const OffersSchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
        image: {
            type: String
        },
        status: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Offers', OffersSchema);
