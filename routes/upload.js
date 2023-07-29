const router = require('express').Router()
const multer = require('multer')
const { verifyToken, verifyTokenAndAuth } = require('./verifyToken')

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, 'uploads')
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname)
	}
})

const upload = multer({ storage })

// UPLOAD IMAGE
router.post('/upload', verifyToken, upload.single('image'), (req, res) => {
	res.json({
		url: `/uploads/${req.file.originalname}`
	})
})

module.exports = router
