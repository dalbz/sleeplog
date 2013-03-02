var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
    date: { type: String, required: true, index: { unique: true } },
    username: { type: String, required: true },
    type: [String],
    tags: [String],
    description: String
});

module.exports = mongoose.model('Event', EventSchema);
