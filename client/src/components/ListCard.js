import React from 'react'
import { useHistory } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'

const DEL_MOVIE = gql`
  mutation DeleteMovie ($deleted: InputData) {
    deleteMovie (deleted: $deleted) {
      _id
    }
  }
`

const DEL_SERIE = gql`
  mutation DeleteSerie ($deleted: InputData) {
    deleteSerie (deleted: $deleted) {
      _id
    }
  }
`

function ListCard(props){
  const history = useHistory()
  const [deleteMovie] = useMutation(DEL_MOVIE)
  const [deleteSerie] = useMutation(DEL_SERIE,
    { onCompleted: () => {props.refetch()}}
  )
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
  return (
    <div className="col-3 hover-shadow d-flex align-items-stretch">
      <div className="card shadow rounded p-3">
        <img src={props.list.poster_path} className="card-img-top" alt="poster" />
        <div className="card-body">
          <h5 className="card-title">{props.list.title}</h5>
          <p className="card-text text-truncate">{props.list.overview}</p>
          <p className="card-text">Rating: {props.list.popularity}</p>
          <div>
            {
              props.list.tags.map((tag, index) => <i className="fas fa-tag mr-2" key={index}>{tag}</i> )
            }
          </div>
          <div className="mt-2 flex">
            <button className="btn btn-outline-primary" onClick={goDetail}><i className="fas fa-info-circle"></i></button>
            <button className="btn btn-outline-danger ml-2" onClick={deleteData}><i className="fas fa-trash-alt"></i></button>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default ListCard