const mongoose = require('mongoose')

const FocusSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: true },
		timeWork: { type: String, required: true },
		timeChill: { type: String, required: true },
		uses: { type: Number, default: 0 },
		creator: { type: Number }
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Focus', FocusSchema)
