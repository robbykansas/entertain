import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import ListCard from '../components/ListCard'
import Navbar from '../components/Navbar'
import { InputTags } from 'react-bootstrap-tagsinput'
import 'react-bootstrap-tagsinput/dist/index.css'
import '../components/Style/Preload.css'
import { GET_SERIES, ADD_SERIE } from '../config/query'
import Swal from 'sweetalert2'

function TvSeries() {
  const { loading, error, data, refetch } = useQuery(GET_SERIES)
  const [addSerie] = useMutation(ADD_SERIE, {
    refetchQueries: [
      { query: GET_SERIES}
    ]
  })
  const [getSerie, setGetSerie] = useState({
    title: '',
    overview: '',
    poster_path: '',
    popularity: '',
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
    let msg = []
    if (getSerie.title === '') {
      msg.push('Title is required')
    }
    if (getSerie.overview === '') {
      msg.push('Overview is required')
    }
    if (getSerie.poster_path === '') {
      msg.push('Poster is required')
    }
    if (getSerie.popularity === '') {
      msg.push('Popularity is required')
    }
    if (getSerie.tags.length === 0) {
      msg.push('Tags is required')
    }
    if (msg.length === 0) {
      addSerie({variables: {newSerie: getSerie}})
        .then(data => refetch())
    } else {
      Swal.fire({
        icon: 'info',
        text: msg.map(message => {return "\n" + message})
      })
    }
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
            <input type="number" step="0.1" max="10" name="popularity" value={getSerie.popularity} onChange={handleInput} className="form-control" placeholder="Ex: 7,5 Max: 10" />
          </div>
          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <InputTags placeholder="Ex: Adventure Horror" values={getSerie.tags} onTags={value => setGetSerie({...getSerie, tags: value.values})} />
          </div>
          <button type="submit" className="btn btn-primary mt-1">Submit</button>
        </form>
        <h2 className="mt-3">TV Series</h2>
        <div className="row flex-row flex-nowrap" style={{overflow: 'auto'}}>
          {
            data.tvSeries.map(list => {
              return (
                <ListCard key={list._id} list={list} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default TvSeries