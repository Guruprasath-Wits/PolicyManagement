const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PolicyCarrierSchema = new Schema({
    companyName: String
});

module.exports = mongoose.model('PolicyCarrier', PolicyCarrierSchema);
