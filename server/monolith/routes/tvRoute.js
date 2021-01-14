const route = require('express').Router()
const TvController = require('../controllers/tvController')

route.get('/', TvController.find)
route.post('/', TvController.insertOne)
route.get('/:id', TvController.findOne)
route.put('/:id', TvController.updateOne)
route.delete('/:id', TvController.deleteOne)

module.exports = route