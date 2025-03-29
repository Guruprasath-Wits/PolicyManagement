const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PolicyInfoSchema = new Schema({
    policyNumber: String,
    startDate: Date,
    endDate: Date,
    policyCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'PolicyCategory' },
    carrierId: { type: mongoose.Schema.Types.ObjectId, ref: 'PolicyCarrier' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('PolicyInfo', PolicyInfoSchema);
