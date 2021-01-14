const route = require('express').Router()
const movieRoute = require('./movieRoute')
const tvRoute = require('./tvRoute')

route.use('/movies', movieRoute)
route.use('/tv', tvRoute)
module.exports = route