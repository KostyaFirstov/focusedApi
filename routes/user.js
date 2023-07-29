const router = require('express').Router()
const User = require('../models/User')
const CryptoJS = require('crypto-js')
const { verifyTokenAndAuth } = require('./verifyToken')

// UPDATE
router.put('/:id', verifyTokenAndAuth, async (req, res) => {
	if (req.body.password) {
		req.body.password = CryptoJS.AES.encrypt(
			req.body.password,
			process.env.PASS_SEC
		).toString()
	}

	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body
			},
			{ new: true }
		)

		res.status(200).json(updatedUser)
	} catch (error) {
		res.status(500).json(error)
	}
})

// DELETE
router.delete('/:id', verifyTokenAndAuth, async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id)
		res.status(200).json('Пользователь был удалён...')
	} catch (error) {
		res.status(500).json(error)
	}
})

// GET USER
router.get('/:id', verifyTokenAndAuth, async (req, res) => {
	try {
		const user = await User.findById(req.params.id)
		const { password, ...others } = user._doc

		res.status(200).json(others)
	} catch (error) {
		res.status(500).json(error)
	}
})

module.exports = router
