const router = require('express').Router()
const Project = require('../models/Project')
const { verifyTokenAndAuth } = require('./verifyToken')

// CREATE
router.post('/', verifyTokenAndAuth, async (req, res) => {
	const newProject = new Project(req.body)

	try {
		const savedProject = await newProject.save()
		res.status(200).json(savedProject)
	} catch (error) {
		res.status(500).json(error)
	}
})

// UPDATE
router.put('/:id', verifyTokenAndAuth, async (req, res) => {
	try {
		const updatedProject = await Project.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body
			},
			{ new: true }
		)

		res.status(200).json(updatedProject)
	} catch (error) {
		res.status(500).json(error)
	}
})

// DELETE
router.delete('/:id', verifyTokenAndAuth, async (req, res) => {
	try {
		await Project.findByIdAndDelete(req.params.id)
		res.status(200).json('Проект был удалён...')
	} catch (error) {
		res.status(500).json(error)
	}
})

// GET PROJECT
router.get('/:id', verifyTokenAndAuth, async (req, res) => {
	try {
		const project = await Project.findById(req.params.id)
		res.status(200).json(project)
	} catch (error) {
		res.status(500).json(error)
	}
})

// GET ALL PROJECTS
router.get('/', verifyTokenAndAuth, async (req, res) => {
	try {
		let project = await Project.find()

		res.status(200).json(project)
	} catch (error) {
		res.status(500).json(error)
	}
})

module.exports = router
