import React, { useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import ListCard from '../components/ListCard'
import Navbar from '../components/Navbar'
import { InputTags } from 'react-bootstrap-tagsinput'
import 'react-bootstrap-tagsinput/dist/index.css'
import '../components/Style/Preload.css'

const GET_SERIES = gql`
query {
  tvSeries {
    _id
    title
    overview
    popularity
    poster_path
    tags
  }
}
`

const ADD_SERIE = gql`
mutation AddSerie($newSerie: InputData) {
  addSerie(newSerie: $newSerie){
    _id
    title
    overview
    popularity
    poster_path
    tags
  }
}
`

function TvSeries() {
  const { loading, error, data, refetch } = useQuery(GET_SERIES)
  const [addSerie] = useMutation(ADD_SERIE)
  const [getSerie, setGetSerie] = useState({
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
      setGetSerie({...getSerie, popularity:Number(value)}) 
    } else if (name !== 'tags') {
      setGetSerie({...getSerie, [name]:value}) 
    }
  }
  
  function handleSubmit(e) {
    e.preventDefault()
    addSerie({variables: {newSerie: getSerie}})
      .then(data => {
        console.log(data)
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
        <h1 style={{textAlign: "center"}} className="mt-2">ADD Serie</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" value={getSerie.title} onChange={handleInput} className="form-control" placeholder="Input Title" />
          </div>
          <div className="form-group">
            <label htmlFor="overview">Overview</label>
            <textarea className="form-control" placeholder="Input Overview" value={getSerie.overview} onChange={handleInput} rows="3" name="overview" />
          </div>
          <div className="form-group">
            <label htmlFor="poster_path">Poster</label>
            <input type="text" name="poster_path" value={getSerie.poster_path} onChange={handleInput} className="form-control" placeholder="Input Link Poster" />
          </div>
          <div className="form-group">
            <label htmlFor="popularity">Popularity</label>
            <input type="number" step="0.1" max="100" name="popularity" value={getSerie.popularity} onChange={handleInput} className="form-control" placeholder="Input Popularity" />
          </div>
          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <InputTags placeholder="Input Tags, ex: Adventure Horror" values={getSerie.tags} onTags={value => setGetSerie({...getSerie, tags: value.values})} />
          </div>
          <button type="submit" className="btn btn-primary mt-1">Submit</button>
        </form>
        <h2 className="mt-3">TV Series</h2>
        <div className="row flex-row flex-nowrap" style={{overflow: 'auto'}}>
          {
            data.tvSeries.map(list => {
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

export default TvSeries