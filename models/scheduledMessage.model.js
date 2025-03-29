const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ScheduledMessageSchema = new Schema({
    message: { type: String, required: true },
    scheduledTime: { type: Date, required: true },
    inserted: { type: Boolean, default: false }
});

module.exports = mongoose.model('ScheduledMessage', ScheduledMessageSchema);
