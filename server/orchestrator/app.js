const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type TvSerie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Query {
    movies: [Movie]
    tvSeries: [TvSerie]
    movie(_id: ID!): Movie
    tvSerie(_id: ID!): Movie
  }

  input InputData {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Mutation {
    addMovie(newMovie: InputData): Movie
    addSerie(newSerie: InputData): TvSerie
    putMovie(editMovie: InputData): Movie
    putSerie(editSerie: InputData): TvSerie
    deleteMovie(deleted: InputData): Movie
    deleteSerie(deleted: InputData): TvSerie
  }
`;

const resolvers = {
  Query: {
    movies: async function () {
      try {
        const cache = await redis.get('movies')
        if (cache) {
          return JSON.parse(cache)
        } else {
          const movies = await axios({
            method: 'GET',
            url: 'http://localhost:4001/movies'
          })
          const data = movies.data
          await redis.set('movies', JSON.stringify(data))
          return data
        }
      } catch (e) {
        throw e
      }
    },
    tvSeries: async function() {
      try {
        const cache = await redis.get('tv')
        if (cache) {
          return JSON.parse(cache)
        } else {
          const tv = await axios.get('http://localhost:4002/tv')
          const data = tv.data
          await redis.set('tv', JSON.stringify(data))
          return data
        }
      } catch (e) {
        throw e
      }
    },
    movie: function(_, args) {
      return axios({
        method: 'GET',
        url: 'http://localhost:4001/movies/' + args._id
      })
        .then(({data}) => {
          return data
        })
        .catch(e => {
          throw e
        })
    },
    tvSerie: function(_, args) {
      return axios({
        method: 'GET',
        url: 'http://localhost:4002/tv/' + args._id
      })
        .then(({data}) => {
          return data
        })
        .catch(e => {
          throw data
        })
    }
  },  
  Mutation: {
    addMovie: function(_, args) {
      const newMovie = {
        title: args.newMovie.title,
        overview: args.newMovie.overview,
        poster_path: args.newMovie.poster_path,
        popularity: args.newMovie.popularity,
        tags: args.newMovie.tags
      }
      return axios({
        method: 'POST',
        url: 'http://localhost:4001/movies',
        data: newMovie
      })
        .then(({data}) => {
          redis.del('movies')
          return data
        })
        .catch(e => {
          throw e
        })
    },
    addSerie: function(_, args) {
      const newSerie = {
        title: args.newSerie.title,
        overview: args.newSerie.overview,
        poster_path: args.newSerie.poster_path,
        popularity: args.newSerie.popularity,
        tags: args.newSerie.tags
      }
      return axios({
        method: 'POST',
        url: 'http://localhost:4002/tv',
        data: newSerie
      })
        .then(({data}) => {
          redis.del('tv')
          return data
        })
        .catch(e => {
          throw e
        })
    },
    putMovie: function(_, args) {
      const editMovie = {
        title: args.editMovie.title,
        overview: args.editMovie.overview,
        poster_path: args.editMovie.poster_path,
        popularity: args.editMovie.popularity,
        tags: args.editMovie.tags
      }
      return axios({
        method: 'PUT',
        url: `http://localhost:4001/movies/${args.editMovie._id}`,
        data: editMovie
      })
        .then(({data}) => {
          redis.del('movies')
          return data.value
        })
        .catch(e => {
          throw e
        })
    },
    putSerie: function(_, args) {
      const editSerie = {
        title: args.editSerie.title,
        overview: args.editSerie.overview,
        poster_path: args.editSerie.poster_path,
        popularity: args.editSerie.popularity,
        tags: args.editSerie.tags
      }
      return axios({
        method: 'PUT',
        url: `http://localhost:4002/tv/${args.editSerie._id}`,
        data: editSerie
      })
        .then(({data}) => {
          redis.del('tv')
          return data.value
        })
        .catch(e => {
          throw e
        })
    },
    deleteMovie: function(_, args) {
      return axios({
        method: 'DELETE',
        url: `http://localhost:4001/movies/${args.deleted._id}`
      })
        .then(({data}) => {
          redis.del('movies')
          return data
        })
        .catch(e => {
          throw e
        })
    },
    deleteSerie: function(_, args) {
      return axios({
        method: 'DELETE',
        url: `http://localhost:4002/tv/${args.deleted._id}`
      })
        .then(({data}) => {
          redis.del('tv')
          return data
        })
        .catch(e => {
          throw e
        })
    }
  }
  
}

const server = new ApolloServer({ typeDefs, resolvers})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});