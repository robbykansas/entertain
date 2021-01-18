import React from 'react'
import Navbar from '../components/Navbar'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

const GET_MOVIE = gql`
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

function DetailMovie() {
  const history = useHistory()
  const params = useParams().id
  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { _id: params },
  })
  if (loading) return <p>Loading ... </p>
  if (error) return <p>Error</p>
  function goEdit() {
    history.push(`/movie/Edit/${data.movie._id}`)
  }
  return(
    <div>
      <Navbar />
      <button style={{float: 'right'}} className="btn btn-outline-primary" onClick={goEdit}>Edit</button>
      <div className="container mt-3">
        <img className="col-3 pr-3"style={{float: 'left'}} src={data.movie.poster_path} alt="poster"/>
        <div>
          <h5>{data.movie.title}</h5>
          <p>Overview: {data.movie.overview}</p>
        </div>
      </div>
    </div>
  )
}

export default DetailMovie