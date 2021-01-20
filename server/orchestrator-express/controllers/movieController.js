const Redis = require('ioredis')
const redis = new Redis()
const axios = require('axios')

class movieController{
  static async getMovies(req, res){
    try{
      const cache = await redis.get('movies')
      if (cache) {
        res.send(JSON.parse(cache))
      } else {
        const movies = await axios.get('http://localhost:4001/movies')
        const data = movies.data
        await redis.set('movies', JSON.stringify(data))
        res.send(data)
      } 
    } catch (e) {
      res.send(e)
    }
  }

  static async findMovieById (req, res) {
    try {
      const id = req.params.id
      const result = axios.get(`http://localhost:4001/movies/${id}`)
      res.status(200).json(result.data)
    } catch (e) {
      res.status(500).json({message: 'Internal Server Error'})
    }
  }

  static async addMovie (req, res) {
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
        url: 'http://localhost:4001/movies',
        data: obj
      })
      if (result) {
        redis.del('movies')
      }
      res.status(201).json(result.data)
    } catch (e) {
      res.status(500).json({message: 'Internal Server Error'})
    }
  }

  static async putMovie (req, res) {
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
        url: `http://localhost:4001/movies/${id}`,
        data: obj
      })
      if (result) {
        redis.del('movies')
      }
      res.status(200).json(result.data)
    } catch (e) {
      res.status(500).json({message: 'Internal Server Error'})
    }
  }
  
  static async deleteMovie (req, res) {
    try {
      const id = req.params.id
      const result = await axios({
        method: 'DELETE',
        url: `http://localhost:4001/movies/${id}`
      })
      if (result) {
        redis.del('movies')
      }
      res.status(200).json({message: 'Data successfully deleted'})
    } catch (e) {
      res.status(500).json({message: 'Internal Server Error'})
    }
  }
}

module.exports = movieController