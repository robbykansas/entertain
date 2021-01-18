import React from 'react'
import { useQuery, gql } from '@apollo/client';
import ListCard from '../components/ListCard'
import Navbar from '../components/Navbar'
import '../components/Style/Preload.css'

const GET_DATA = gql`
query {
  movies {
    _id
    title
    overview
    popularity
    poster_path
    tags
  }
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

function MainPage(){
  const { loading, error, data, refetch } = useQuery(GET_DATA)
  if (loading) return <div className="loader">Loading...</div>
  if (error) return <p>Error</p>
  function refetchData() {
    refetch()
  }
  return (
    <div>
      <Navbar />
      <div className="container">
      <h2>Movies</h2>
        <div className="row flex-row flex-nowrap d-flex align-items-stretch pb-3" style={{overflow: 'auto'}}>
          {
            data.movies.map(list => {
              return (
                <ListCard key={list._id} list={list} />
              )
            })
          }
        </div>
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

export default MainPage