const mongoose = require('mongoose');

const SizeSchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Size', SizeSchema);
