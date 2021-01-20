const Redis = require('ioredis')
const redis = new Redis()
const axios = require('axios')

class movieController{
  static async getSeries(req, res){
    try{
      const cache = await redis.get('tv')
      if (cache) {
        res.send(JSON.parse(cache))
      } else {
        const tv = await axios.get('http://localhost:4002/tv')
        const data = tv.data
        await redis.set('tv', JSON.stringify(data))
        res.send(data)
      } 
    } catch (e) {
      res.send(e)
    }
  }

  static async findSerieById (req, res) {
    try {
      const id = req.params.id
      const result = axios.get(`http://localhost:4002/tv/${id}`)
      res.status(200).json(result.data)
    } catch (e) {
      res.status(500).json({message: 'Internal Server Error'})
    }
  }

  static async addSerie (req, res) {
    try {
      const obj = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags: req.body.tags
      }
      const result = await axios({
        method: 'POST',
        url: 'http://localhost:4002/tv',
        data: obj
      })
      if (result) {
        redis.del('tv')
      }
      res.status(201).json(result.data)
    } catch (e) {
      res.status(500).json({message: 'Internal Server Error'})
    }
  }

  static async putSerie (req, res) {
    try {
      const id = req.params.id
      const obj = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags: req.body.tags
      }
      const result = await axios({
        method: 'PUT',
        url: `http://localhost:4002/tv/${id}`,
        data: obj
      })
      if (result) {
        redis.del('tv')
      }
      res.status(200).json(result.data)
    } catch (e) {
      res.status(500).json({message: 'Internal Server Error'})
    }
  }
  
  static async deleteSerie (req, res) {
    try {
      const id = req.params.id
      const result = await axios({
        method: 'DELETE',
        url: `http://localhost:4002/tv/${id}`
      })
      if (result) {
        redis.del('tv')
      }
      res.status(200).json({message: 'Data successfully deleted'})
    } catch (e) {
      res.status(500).json({message: 'Internal Server Error'})
    }
  }
}

module.exports = movieController