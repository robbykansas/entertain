const Movies = require('../models/Movies')

class MovieController {
  static find(req, res){
    Movies.find()
      .then(result => {
        res.send(result)
      })
      .catch(e => res.status(500).json('internal server error'))
  }
  static findOne(req, res){
    const id = req.params.id
    Movies.findOne(id)
      .then(result => {
        console.log(id)
        res.status(201).json(result)
      })
      .catch(e => res.status(500).json('internal server error'))
  }
  static insertOne(req, res){
    const obj = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags
    }
    Movies.insertOne(obj)
      .then(result => {
        res.status(201).json(result.ops[0])
      })
      .catch(e => res.status(500).json('internal server error'))
  }
  static updateOne(req, res){
    const id = req.params.id
    const obj = {
      title: req.body.title
    }
    Movies.updateOne(id, obj)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(e => res.status(500).json('internal server error'))
  }
  static deleteOne(req, res){
    const id = req.params.id
    Movies.deleteOne(id)
      .then(result => {
        res.status(200).json('successfully deleted data')
      })
      .catch(e => res.status(500).json('internal server error'))
  }
}

module.exports = MovieController