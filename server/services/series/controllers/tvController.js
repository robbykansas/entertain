const Tv = require('../models/Tv')

class TvController {
  static find(req, res){
    Tv.find()
      .then(result => {
        res.send(result)
      })
      .catch(e => res.status(500).json('internal server error'))
  }
  static findOne(req, res){
    const id = req.params.id
    Tv.findOne(id)
      .then(result => {
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
    Tv.insertOne(obj)
      .then(result => {
        res.status(201).json(result.ops[0])
      })
      .catch(e => res.status(500).json('internal server error'))
  }
  static findOneAndUpdate(req, res){
    const id = req.params.id
    const obj = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags
    }
    Tv.findOneAndUpdate(id, obj)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(e => res.status(500).json('internal server error'))
  }
  static deleteOne(req, res){
    const id = req.params.id
    Tv.deleteOne(id)
      .then(result => {
        res.status(200).json('successfully deleted data')
      })
      .catch(e => res.status(500).json('internal server error'))
  }
}

module.exports = TvController