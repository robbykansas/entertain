const route = require('express').Router()
const movieController = require('../controllers/movieController')

route.get('/', movieController.getMovies)
route.post('/', movieController.addMovie)
route.get('/:id', movieController.findMovieById)
route.put('/:id', movieController.putMovie)
route.delete('/:id', movieController.deleteMovie)

module.exports = route