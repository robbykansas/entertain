import React, {useState} from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import Navbar from '../components/Navbar'
import { InputTags } from 'react-bootstrap-tagsinput'
import 'react-bootstrap-tagsinput/dist/index.css'
import { useHistory, useParams } from 'react-router-dom'

const GET_MOVIE = gql `
query GetMovie($_id: ID!){
  movie (_id: $_id) {
    _id
    title
    overview
    popularity
    poster_path
    tags
  }
}
`

const PUT_MOVIE = gql`
mutation PutMovie($editMovie: InputData) {
  putMovie(editMovie: $editMovie) {
    _id
    title
    overview
    popularity
    poster_path
    tags
  }
}
`

function EditMovie() {
  const history = useHistory()
  const [putMovie] = useMutation(PUT_MOVIE)
  const params = useParams().id
  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { _id: params },
  })
  const [getMovie, setGetMovie] = useState({
    _id: data.movie._id,
    title: data.movie.title,
    overview: data.movie.overview,
    popularity: data.movie.popularity,
    poster_path: data.movie.poster_path,
    tags: data.movie.tags
  })
  if (loading) return <p>Loading ... </p>
  if (error) return <p>Error</p>

  function handleInput(event) {
    const {name, value} = event.target
    if (name === 'popularity') {
      setGetMovie({...getMovie, popularity:Number(value)}) 
    } else if (name !== 'tags') {
      setGetMovie({...getMovie, [name]:value}) 
    }
  }
  function handleSubmit(e) {
    e.preventDefault()
    putMovie({variables: {editMovie: getMovie}})
    history.push('/')
  }

  return(
    <div>
      <Navbar />
      <div className="container">
        <h1 style={{textAlign: "center"}} className="mt-2">Edit Movie</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" value={getMovie.title} onChange={handleInput} className="form-control" placeholder="Input Title" />
          </div>
          <div className="form-group">
            <label htmlFor="overview">Overview</label>
            <textarea className="form-control" value={getMovie.overview} onChange={handleInput} rows="3" name="overview" />
          </div>
          <div className="form-group">
            <label htmlFor="poster_path">Poster</label>
            <input type="text" name="poster_path" value={getMovie.poster_path} onChange={handleInput} className="form-control" placeholder="Input Link Poster" />
          </div>
          <div className="form-group">
            <label htmlFor="popularity">Popularity</label>
            <input type="number" name="popularity" value={getMovie.popularity} onChange={handleInput} className="form-control" placeholder="Input Popularity" />
          </div>
          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <InputTags values={getMovie.tags} onTags={value => setGetMovie({...getMovie, tags: value.values})} />
          </div>
          <button type="submit" className="btn btn-primary mt-1">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default EditMovie