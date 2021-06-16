const express = require('express')
const path = require('path')
const cors = require('cors')

const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const port = 3001

var projectRouter = require('./routes/project')
app.use('/projects', projectRouter)
const PORT = process.nextTick.PORT || 5000;

app.listen(PORT, console.log('server started'))
