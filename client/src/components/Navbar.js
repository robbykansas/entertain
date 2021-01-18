import React from 'react'
import { useHistory } from 'react-router-dom'

function Navbar() {
  const history = useHistory()
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
    console.log('movies')
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
        </div>
      </nav>
    </div>
  )
}

export default Navbar