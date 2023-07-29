const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, unique: true },
		desc: { type: String },
		color: { type: String, default: '#CB8CCC' },
		timeProject: {
			projectStart: { type: String, required: true },
			projectEnd: { type: String, required: true }
		},
		private: { type: Boolean, required: true }
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Project', ProjectSchema)
