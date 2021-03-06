const db = require('../config/mongo')
const Moviesdb = db.collection("movies")
const {ObjectId} = require('mongodb')

class Movies {
  static find(){
    return Moviesdb.find().toArray()
  }
  static findOne(id){
    return Moviesdb.findOne({_id: ObjectId(id)})
  }
  static insertOne(data){
    return Moviesdb.insertOne(data)
  }
  static updateOne(id, action){
    return Moviesdb.updateOne({_id: ObjectId(id)}, { $set: action})
  }
  static deleteOne(id){
    return Moviesdb.deleteOne({_id: ObjectId(id)})
  }
}

module.exports = Movies