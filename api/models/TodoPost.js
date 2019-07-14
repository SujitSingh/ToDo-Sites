const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const postSchema = new Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true, min: 2, max: 500, trim: true },
  addedDate: { type: Date, default: Date.now, required: true },
  complete: { type: Boolean, required: true }
});

module.exports = mongoose.model('TodoPost', postSchema);