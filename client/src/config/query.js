import { gql } from '@apollo/client';

export const GET_DATA = gql`
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

export const GET_MOVIES = gql`
query {
  movies {
    _id
    title
    overview
    popularity
    poster_path
    tags
  }
}
`

export const GET_SERIES = gql`
query {
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

export const GET_MOVIE = gql `
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

export const GET_SERIE = gql`
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

export const ADD_MOVIE = gql`
mutation AddMovie($newMovie: InputData) {
  addMovie(newMovie: $newMovie) {
    _id
    title
    overview
    popularity
    poster_path
    tags
  }
}
`

export const ADD_SERIE = gql`
mutation AddSerie($newSerie: InputData) {
  addSerie(newSerie: $newSerie){
    _id
    title
    overview
    popularity
    poster_path
    tags
  }
}
`

export const PUT_MOVIE = gql`
mutation PutMovie($editMovie: InputData) {
  putMovie(editMovie: $editMovie) {
    _id
    title
    overview
    popularity
    poster_path
    tags
  }
}
`

export const PUT_SERIE = gql`
mutation PutSerie($editSerie: InputData) {
  putSerie(editSerie: $editSerie) {
    _id
    title
    overview
    popularity
    poster_path
    tags
  }
}
`

export const DEL_MOVIE = gql`
  mutation DeleteMovie ($deleted: InputData) {
    deleteMovie (deleted: $deleted) {
      _id
    }
  }
`

export const DEL_SERIE = gql`
  mutation DeleteSerie ($deleted: InputData) {
    deleteSerie (deleted: $deleted) {
      _id
    }
  }
`

export const GET_FAVORITES = gql`
  query {
    favorites @client
  }
`