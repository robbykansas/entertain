const route = require('express').Router()
const MovieController = require('../controllers/movieController')

route.get('/', MovieController.find)
route.post('/', MovieController.insertOne)
route.get('/:id', MovieController.findOne)
route.put('/:id', MovieController.findOneAndUpdate)
route.delete('/:id', MovieController.deleteOne)

module.exports = route