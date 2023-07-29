const router = require('express').Router()
const Task = require('../models/Task')
const { verifyTokenAndAuth } = require('./verifyToken')

// CREATE
router.post('/', verifyTokenAndAuth, async (req, res) => {
	const newTask = new Task(req.body)

	try {
		const savedTask = await newTask.save()
		res.status(200).json(savedTask)
	} catch (error) {
		res.status(500).json(error)
	}
})

// UPDATE
router.put('/:id', verifyTokenAndAuth, async (req, res) => {
	try {
		const updatedTask = await Task.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body
			},
			{ new: true }
		)

		res.status(200).json(updatedTask)
	} catch (error) {
		res.status(500).json(error)
	}
})

// DELETE
router.delete('/:id', verifyTokenAndAuth, async (req, res) => {
	try {
		await Task.findByIdAndDelete(req.params.id)
		res.status(200).json('Задача был удалёна...')
	} catch (error) {
		res.status(500).json(error)
	}
})

// GET TASK
router.get('/:id', verifyTokenAndAuth, async (req, res) => {
	try {
		const task = await Task.findById(req.params.id)
		res.status(200).json(task)
	} catch (error) {
		res.status(500).json(error)
	}
})

// GET ALL TASKS
router.get('/', verifyTokenAndAuth, async (req, res) => {
	try {
		let task = await Task.find()

		res.status(200).json(task)
	} catch (error) {
		res.status(500).json(error)
	}
})

module.exports = router
