const router = require('express').Router()
const Diary = require('../models/Diary')
const { verifyTokenAndAuth } = require('./verifyToken')

// CREATE
router.post('/', verifyTokenAndAuth, async (req, res) => {
	const newDiary = new Diary(req.body)

	try {
		const savedDiary = await newDiary.save()
		res.status(200).json(savedDiary)
	} catch (error) {
		res.status(500).json(error)
	}
})

// UPDATE
router.put('/:id', verifyTokenAndAuth, async (req, res) => {
	try {
		const updatedDiary = await Diary.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body
			},
			{ new: true }
		)

		res.status(200).json(updatedDiary)
	} catch (error) {
		res.status(500).json(error)
	}
})

// DELETE
router.delete('/:id', verifyTokenAndAuth, async (req, res) => {
	try {
		await Diary.findByIdAndDelete(req.params.id)
		res.status(200).json('Запись дневника была удалёна...')
	} catch (error) {
		res.status(500).json(error)
	}
})

// GET DIARY
router.get('/:id', verifyTokenAndAuth, async (req, res) => {
	try {
		const diary = await Diary.findById(req.params.id)
		res.status(200).json(diary)
	} catch (error) {
		res.status(500).json(error)
	}
})

// GET ALL DIARIES
router.get('/', verifyTokenAndAuth, async (req, res) => {
	const qNew = req.query.new
	const qTags = req.query.tags
	const qPopular = req.query.popular

	try {
		let diary

		if (qTags) {
			diary = await Diary.find({ tags: qTags })
		} else if (qNew) {
			diary = await Diary.find().sort({ createdAt: -1 })
		} else if (qPopular) {
			diary = await Diary.find().sort({ viewsCount: -1 })
		} else if (qTags && qNew) {
			diary = await Diary.find({ tags: qTags }).sort({ createdAt: -1 })
		} else {
			diary = await Diary.find()
		}

		res.status(200).json(diary)
	} catch (error) {
		res.status(500).json(error)
	}
})

module.exports = router
