const mongoose = require('mongoose')

const DiarySchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		text: { type: String },
		tags: { type: Array },
		mood: { type: String }
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Diary', DiarySchema)
