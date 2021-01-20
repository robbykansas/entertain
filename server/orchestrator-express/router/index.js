const route = require('express').Router()
const movieRoute = require('./movieRoute')
const serieRoute = require('./serieRoute')

route.get('/entertainme', orchestratorController.getOrchestrator)
route.use('/tv', serieRoute)
route.use('/movies', movieRoute)
module.exports = route