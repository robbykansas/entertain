const route = require('express').Router()
const tvRoute = require('./tvRoute')

route.use('/tv', tvRoute)
module.exports = route