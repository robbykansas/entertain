import React from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { DEL_MOVIE, DEL_SERIE, GET_FAVORITES, GET_MOVIES, GET_SERIES, GET_DATA } from '../config/query'
import { favoritesVar } from '../cache'
import StarRatings from 'react-star-ratings'
import Swal from 'sweetalert2'

function ListCard(props){
  const history = useHistory()
  const {data} = useQuery(GET_FAVORITES)

  const [deleteMovie] = useMutation(DEL_MOVIE, {
    refetchQueries: [
      { query: history.location.pathname !== '/' ? GET_MOVIES : GET_DATA}
    ]
  })

  const [deleteSerie] = useMutation(DEL_SERIE, {
    refetchQueries: [
      { query: history.location.pathname !== '/' ? GET_SERIES : GET_DATA}
    ]
  })

  function goDetail(){
    if (props.list.__typename === 'Movie') {
      history.push(`/movie/Detail/${props.list._id}`)
    } else {
      history.push(`/tv/Detail/${props.list._id}`)
    }
  }

  function deleteData(){
    const deletedId = {
      _id: props.list._id
    }
    if (props.list.__typename === 'Movie') {
      deleteMovie({variables: {deleted: deletedId}})
    } else {
      deleteSerie({variables: {deleted: deletedId}})
    }
  }
  function addFavorites(){
    const prevData = favoritesVar()
    const dupe = data.favorites.find(founded => founded._id === props.list._id)
    if (dupe) {
      if (history.location.pathname === '/favorites') {
        const filterData = data.favorites.filter(founded => founded._id !== props.list._id)
        favoritesVar(filterData)
      } else {
        Swal.fire({
          icon: 'info',
          title: 'data already exists in favorites'
        })
        // console.log('data already exists')
      }
    } else {
      favoritesVar([...prevData, props.list])
    }
  }
  return (
    <div className="col-3 hover-shadow d-flex align-items-stretch">
      <div className="card shadow rounded p-3">
        <img src={props.list.poster_path} className="card-img-top" alt="poster" />
        <div className="card-body">
          <h5 className="card-title">{props.list.title}</h5>
          <p className="card-text text-truncate">{props.list.overview}</p>
          <p className="card-text mb-auto">Popularity:</p>
          <StarRatings rating={props.list.popularity} numberOfStars={10} starDimension="10" starSpacing="3"/>
          <div>
            <p className="card-text mb-auto mt-3">Tags:</p>
            {
              props.list.tags.map((tag, index) => <i className="fas fa-tag mr-2 mt-2" key={index}>{tag}</i> )
            }
          </div>
          <div className="mt-2 flex">
            <button className="btn btn-outline-primary" onClick={goDetail}><i className="fas fa-info-circle"></i></button>
            { history.location.pathname !== '/favorites' && <button className="btn btn-outline-danger ml-1" onClick={deleteData}><i className="fas fa-trash-alt"></i></button>}
            <button className="btn btn-outline-warning ml-1" onClick={addFavorites}>
              {data.favorites.find(founded => founded._id === props?.list?._id) ? <i className="fas fa-star"></i> : <i className="far fa-star"></i>}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListCard