import React from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_MOVIE } from '../config/query'
import StarRatings from 'react-star-ratings'
import '../components/Style/Preload.css'

function DetailMovie() {
  const params = useParams().id
  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { _id: params },
  })
  if (loading) return <div className="loader">Loading...</div>
  if (error) return <p>Error</p>
  return(
    <div>
      <Navbar />
      <div className="container mt-3">
        <img className="col-3 pr-3"style={{float: 'left'}} src={data.movie.poster_path} alt="poster"/>
        <div className="bg-light">
          <h5>{data.movie.title}</h5>
          <p>Overview: {data.movie.overview}</p>
          <p className="mb-auto">Popularity:</p>
          <StarRatings rating={data.movie.popularity} numberOfStars={10} starDimension="25"/> <br />
          <p className="mt-3 mb-auto">Tags:</p>
          {
            data.movie.tags.map((tag, index) => <i className="fas fa-tag mr-2 mt-2" key={index}>{tag}</i> )
          }
        </div>
      </div>
    </div>
  )
}

export default DetailMovie