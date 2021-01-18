import React, {useState} from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import Navbar from '../components/Navbar'
import { InputTags } from 'react-bootstrap-tagsinput'
import 'react-bootstrap-tagsinput/dist/index.css'
import { useHistory, useParams } from 'react-router-dom'

const GET_SERIE = gql`
query GetSerie($_id: ID!){
  tvSerie (_id: $_id) {
    _id
    title
    overview
    popularity
    poster_path
    tags
  }
}
`

const PUT_SERIE = gql`
mutation PutSerie($editSerie: InputData) {
  putSerie(editSerie: $editSerie) {
    _id
    title
    overview
    popularity
    poster_path
    tags
  }
}
`

function EditSerie() {
  const history = useHistory()
  const [putSerie] = useMutation(PUT_SERIE)
  const params = useParams().id
  const { loading, error, data } = useQuery(GET_SERIE, {
    variables: { _id: params },
  })
  console.log(params)
  const [getSerie, setGetSerie] = useState({
    _id: data.tvSerie._id,
    title: data.tvSerie.title,
    overview: data.tvSerie.overview,
    popularity: data.tvSerie.popularity,
    poster_path: data.tvSerie.poster_path,
    tags: data.tvSerie.tags
  })
  
  if (loading) return <p>Loading ... </p>
  if (error) return <p>Error</p>

  function handleInput(event) {
    const {name, value} = event.target
    if (name !== 'tags') {
      setGetSerie({...getSerie, [name]:value}) 
    }
  }
  function handleSubmit(e) {
    e.preventDefault()
    putSerie({variables: {editSerie: getSerie}})
    history.push('/')
  }

  return(
    <div>
      <Navbar />
      <div className="container">
        <h1 style={{textAlign: "center"}} className="mt-2">Edit Serie</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" value={getSerie.title} onChange={handleInput} className="form-control" placeholder="Input Title" />
          </div>
          <div className="form-group">
            <label htmlFor="overview">Overview</label>
            <textarea className="form-control" value={getSerie.overview} onChange={handleInput} rows="3" name="overview" />
          </div>
          <div className="form-group">
            <label htmlFor="poster_path">Poster</label>
            <input type="text" name="poster_path" value={getSerie.poster_path} onChange={handleInput} className="form-control" placeholder="Input Link Poster" />
          </div>
          <div className="form-group">
            <label htmlFor="popularity">Popularity</label>
            <input type="number" name="popularity" value={getSerie.popularity} onChange={handleInput} className="form-control" placeholder="Input Popularity" />
          </div>
          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <InputTags values={getSerie.tags} onTags={value => setGetSerie({...getSerie, tags: value.values})} />
          </div>
          <button type="submit" className="btn btn-primary mt-1">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default EditSerie