const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AgentSchema = new Schema({
    name: { type: String, required: true }
});

module.exports = mongoose.model('Agent', AgentSchema);
