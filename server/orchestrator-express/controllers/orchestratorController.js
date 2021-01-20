const Redis = require('ioredis')
const redis = new Redis()
const axios = require('axios')

class orchestratorController {
  static async getOrchestrator(req, res){
    try{
      const cache = await redis.get('orchestrator-express')
      if (cache) {
        res.send(JSON.parse(cache))
      } else {
        const tv = await axios.get('http://localhost:4002/tv')
        const movies = await axios.get('http://localhost:4001/movies')
        const data = {
          movies: movies.data,
          tvSeries: tv.data
        }
        await redis.set('orchestrator', JSON.stringify(data))
        res.send(data)
      }
    } catch (e) {
      res.send(e)
    }
  }
}

module.exports = orchestratorController