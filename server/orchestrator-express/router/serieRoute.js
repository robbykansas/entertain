const route = require('express').Router()
const serieController = require('../controllers/serieController')

route.get('/', serieController.getSeries)
route.post('/', serieController.addSerie)
route.get('/:id', serieController.findSerieById)
route.put('/:id', serieController.putSerie)
route.delete('/:id', serieController.deleteSerie)

module.exports = route