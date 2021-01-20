import React, {useState} from 'react'
import { useQuery, useMutation } from '@apollo/client'
import Navbar from '../components/Navbar'
import { InputTags } from 'react-bootstrap-tagsinput'
import 'react-bootstrap-tagsinput/dist/index.css'
import { useHistory, useParams } from 'react-router-dom'
import { GET_MOVIE, PUT_MOVIE } from '../config/query'
import Swal from 'sweetalert2'
import '../components/Style/Preload.css'


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
  if (loading) return <div className="loader">Loading...</div>
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
    let msg = []
    if (getMovie.title === '') {
      msg.push('Title is required')
    }
    if (getMovie.overview === '') {
      msg.push('Overview is required')
    }
    if (getMovie.poster_path === '') {
      msg.push('Poster is required')
    }
    if (getMovie.popularity === '') {
      msg.push('Popularity is required')
    }
    if (getMovie.tags.length === 0) {
      msg.push('Tags is required')
    }
    if (msg.length === 0) {
      putMovie({variables: {editMovie: getMovie}})
        .then(data => history.push('/'))
    } else {
      Swal.fire({
        icon: 'info',
        text: msg.map(message => {return "\n" + message})
      })
    }
    // putMovie({variables: {editMovie: getMovie}})
    // history.push('/')
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
            <input type="number" step="0.1" max="10" name="popularity" value={getMovie.popularity} onChange={handleInput} className="form-control" placeholder="Ex: 7,5 Max: 10" />
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