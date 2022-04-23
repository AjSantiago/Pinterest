const { Schema, model } = require('mongoose');

const imageSchema = new Schema({
	title: { type: String },
	description: { type: String },
	filename: { type: String },
	path: { type: String },
	originalName: { type: String },
	mimeType: { type: String },
	size: { type: Number },
	created_at: { type: Date, default: Date.now() },
});

module.exports = model('image', imageSchema);
