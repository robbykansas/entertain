import React from 'react'
import { useQuery } from '@apollo/client';
import ListCard from '../components/ListCard'
import Navbar from '../components/Navbar'
import '../components/Style/Preload.css'
import { GET_FAVORITES } from '../config/query'

function FavoritesPage() {
  const { loading, error, data } = useQuery(GET_FAVORITES)
  if (loading) return <div className="loader">Loading...</div>
  if (error) return <p>Error</p>
  
  return (
    <div>
      <Navbar />
      <div className="container">
        <h2 className="mt-2">Favorites</h2>
          <div className="row flex-row flex-nowrap d-flex align-items-stretch pb-3" style={{overflow: 'auto'}}>
            {
              data.favorites.map(list => {
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

export default FavoritesPage