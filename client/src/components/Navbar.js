import React from 'react'
import { useHistory, useParams } from 'react-router-dom'

function Navbar() {
  const history = useHistory()
  const params = useParams().id

  function goMain() {
    history.push('/')
  }
  function goMovies() {
    history.push('/movies')
  }
  function goTv() {
    history.push('/tv')
  }
  function goFavorites() {
    history.push('/favorites')
  }
  function goEdit() {
    history.push(`/movie/Edit/${params}`)
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#/goMain" onClick={goMain}>Main Page</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="#/goMovies" onClick={goMovies}>Movies</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="#/goTv" onClick={goTv}>TV Series</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="#/goFavorites" onClick={goFavorites}>Favorites</a>
            </li>
          </ul>
          <div className="mr-2">
            {history.location.pathname === `/movie/Detail/${params}` && <button style={{float: 'right'}} className="btn btn-outline-primary" onClick={goEdit}>Edit</button>}
            {history.location.pathname === `/tv/Detail/${params}` && <button style={{float: 'right'}} className="btn btn-outline-primary" onClick={goEdit}>Edit</button>}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar