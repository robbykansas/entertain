import React, { useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import ListCard from '../components/ListCard'
import Navbar from '../components/Navbar'
import { InputTags } from 'react-bootstrap-tagsinput'
import 'react-bootstrap-tagsinput/dist/index.css'
import '../components/Style/Preload.css'

const GET_MOVIES = gql`
query {
  movies {
    _id
    title
    overview
    popularity
    poster_path
    tags
  }
}
`
const ADD_MOVIE = gql`
mutation AddMovie($newMovie: InputData) {
  addMovie(newMovie: $newMovie) {
    _id
    title
    overview
    popularity
    poster_path
    tags
  }
}
`

function Movies(){
  const { loading, error, data, refetch } = useQuery(GET_MOVIES)
  const [addMovie] = useMutation(ADD_MOVIE)
  const [getMovie, setGetMovie] = useState({
    title: '',
    overview: '',
    poster_path: '',
    popularity: 0,
    tags: []
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
    addMovie({variables: {newMovie: getMovie}})
      .then(data => {
        refetch()
      })
      .catch(e => console.log(e))
  }

  function refetchData() {
    refetch()
  }
  return(
    <div>
      <Navbar />
      <div className="container">
        <h1 style={{textAlign: "center"}} className="mt-2">ADD Movie</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" value={getMovie.title} onChange={handleInput} className="form-control" placeholder="Input Title" />
          </div>
          <div className="form-group">
            <label htmlFor="overview">Overview</label>
            <textarea className="form-control" placeholder="Input Overview" value={getMovie.overview} onChange={handleInput} rows="3" name="overview" />
          </div>
          <div className="form-group">
            <label htmlFor="poster_path">Poster</label>
            <input type="text" name="poster_path" value={getMovie.poster_path} onChange={handleInput} className="form-control" placeholder="Input Link Poster" />
          </div>
          <div className="form-group">
            <label htmlFor="popularity">Popularity</label>
            <input type="number" step="0.1" max="100" name="popularity" value={getMovie.popularity} onChange={handleInput} className="form-control" placeholder="Input Popularity" />
          </div>
          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <InputTags placeholder="Input Tags, ex: Adventure Horror" values={getMovie.tags} onTags={value => setGetMovie({...getMovie, tags: value.values})} />
          </div>
          <button type="submit" className="btn btn-primary mt-1">Submit</button>
        </form>
        <h2 className="mt-3">Movies</h2>
        <div className="row flex-row flex-nowrap" style={{overflow: 'auto'}}>
          {
            data.movies.map(list => {
              return (
                <ListCard key={list._id} list={list} refetch={refetchData}/>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Movies