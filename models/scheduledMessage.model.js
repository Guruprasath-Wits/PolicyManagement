const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ScheduledMessageSchema = new Schema({
    message: { type: String, required: true },
    scheduleTime: { type: Date, required: true },
    status: { type: String, enum: ["pending", "sent"], default: "pending" },
});

module.exports = mongoose.model('ScheduledMessage', ScheduledMessageSchema);
