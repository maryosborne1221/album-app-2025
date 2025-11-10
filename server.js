//Build server
const express = require('express')
const server = express()
const PORT = process.env.PORT || 3000

//Handle security
const helmet = require('helmet')
const cors = require('cors')

server.use(helmet())
server.use(cors())

const router = require('./routes/router')

server.listen(PORT, ()=> console.log('The Dodgers won the 2025 World Series!!'))

