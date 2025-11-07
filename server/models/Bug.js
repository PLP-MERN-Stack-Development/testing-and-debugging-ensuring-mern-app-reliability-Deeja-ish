const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Please add a title'], },
  description: { type: String, required: [true, 'Please add a description'], },
  status: { type: String, enum: ['Open', 'In-Progress', 'Resolved'], default: 'Open', },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Bug', bugSchema);