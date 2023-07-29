const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const taskRoute = require('./routes/task')
const diaryRoute = require('./routes/diary')
const focusRoute = require('./routes/focus')
const projectRoute = require('./routes/project')
const uploadRoute = require('./routes/upload')

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())

// CONNECT ROUTES
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/tasks', taskRoute)
app.use('/api/diaries', diaryRoute)
app.use('/api/focuses', focusRoute)
app.use('/api/projects', projectRoute)
app.use('/uploads', uploadRoute)
app.use('/uploads', express.static('uploads'))

// CONECT TO DB
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log('DBConnection SuccessFull!'))
	.catch(err => console.log(err))

app.listen(process.env.PORT || 5000, () => {
	console.log('Backend server is running!')
})
