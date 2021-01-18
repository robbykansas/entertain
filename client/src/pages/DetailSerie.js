import React from 'react'
import Navbar from '../components/Navbar'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

const GET_SERIE = gql`
query GetSerie($_id: ID!) {
  tvSerie(_id: $_id) {
    _id
    title
    overview
    popularity
    poster_path
    tags
  }
}
`

function DetailSerie() {
  const history = useHistory()
  const params = useParams().id
  const { loading, error, data } = useQuery(GET_SERIE, {
    variables: { _id: params }
  })
  if (loading) return <p>Loading ... </p>
  if (error) return <p>Error</p>
  function goEdit() {
    history.push(`/tv/Edit/${data.tvSerie._id}`)
  }
  return(
    <div>
      <Navbar />
      <button style={{float: 'right'}} className="btn btn-outline-primary" onClick={goEdit}>Edit</button>
      <div className="container mt-3">
        <img className="col-3 pr-3" style={{float: 'left'}} src={data.tvSerie.poster_path} alt="poster"/>
        <div>
          <h5>{data.tvSerie.title}</h5>
          <p>Overview: {data.tvSerie.overview}</p>
        </div>
      </div>
    </div>
  )
}

export default DetailSerie