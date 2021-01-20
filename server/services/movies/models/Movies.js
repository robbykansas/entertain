const dbConnection = require('../config/mongo')
const {ObjectId} = require('mongodb')

class Movies {
  static find(){
    return dbConnection()
    .then(db => {
        const Moviesdb = db.collection("movies")
        return Moviesdb.find().toArray()
      })
  }
  static findOne(id){
    return dbConnection()
      .then(db => {
        const Moviesdb = db.collection("movies")
        return Moviesdb.findOne({_id: ObjectId(id)})
      })
  }
  static insertOne(data){
    return dbConnection()
      .then(db => {
        const Moviesdb = db.collection("movies")
        return Moviesdb.insertOne(data)
      })
  }
  static findOneAndUpdate(id, action){
    return dbConnection()
      .then(db => {
        const Moviesdb = db.collection("movies")
        return Moviesdb.findOneAndUpdate({_id: ObjectId(id)}, { $set: action}, {returnOriginal: false})
      })
  }
  static deleteOne(id){
    return dbConnection()
      .then(db => {
        const Moviesdb = db.collection("movies")
        return Moviesdb.deleteOne({_id: ObjectId(id)})
      })
  }
}

module.exports = Movies