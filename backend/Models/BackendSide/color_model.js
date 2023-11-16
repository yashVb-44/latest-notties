const mongoose = require('mongoose');

const ColorSchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Color', ColorSchema);
