const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, unique: true },
		desc: { type: String },
		section: { type: String, required: true },
		priority: { type: String, default: 'Low' },
		image: { type: String },
		project: { type: String, required: true, default: '' }
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Task', TaskSchema)
