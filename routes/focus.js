const router = require('express').Router()
const Focus = require('../models/Focus')
const { verifyTokenAndAuth } = require('./verifyToken')

// CREATE
router.post('/', verifyTokenAndAuth, async (req, res) => {
	const newFocus = new Focus(req.body)

	try {
		const savedFocus = await newFocus.save()
		res.status(200).json(savedFocus)
	} catch (error) {
		res.status(500).json(error)
	}
})

// UPDATE
router.put('/:id', verifyTokenAndAuth, async (req, res) => {
	try {
		const updatedFocus = await Focus.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body
			},
			{ new: true }
		)

		res.status(200).json(updatedFocus)
	} catch (error) {
		res.status(500).json(error)
	}
})

// DELETE
router.delete('/:id', verifyTokenAndAuth, async (req, res) => {
	try {
		await Focus.findByIdAndDelete(req.params.id)
		res.status(200).json('Режим фокусировки был удалён...')
	} catch (error) {
		res.status(500).json(error)
	}
})

// GET FOCUS
router.get('/:id', verifyTokenAndAuth, async (req, res) => {
	try {
		const focus = await Focus.findById(req.params.id)
		res.status(200).json(focus)
	} catch (error) {
		res.status(500).json(error)
	}
})

// GET ALL FOCUSES
router.get('/', verifyTokenAndAuth, async (req, res) => {
	const qNew = req.query.new

	try {
		let focus

		if (qNew) {
			diary = await Focus.find().sort({ createdAt: -1 })
		} else {
			diary = await Focus.find()
		}

		res.status(200).json(focus)
	} catch (error) {
		res.status(500).json(error)
	}
})

module.exports = router
