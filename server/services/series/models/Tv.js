const dbConnection = require('../config/mongo')

const {ObjectId} = require('mongodb')

class Tv {
  static find(){
    return dbConnection()
      .then(db => {
        const Tvdb = db.collection("tv")
        return Tvdb.find().toArray()
      })
  }
  static findOne(id){
    return dbConnection()
      .then(db => {
        const Tvdb = db.collection("tv")
        return Tvdb.findOne({_id: ObjectId(id)})
      })
  }
  static insertOne(data){
    return dbConnection()
      .then(db => {
        const Tvdb = db.collection("tv")
        return Tvdb.insertOne(data)
      })
  }
  static findOneAndUpdate(id, action){
    return dbConnection()
      .then(db => {
        const Tvdb = db.collection("tv")
        return Tvdb.findOneAndUpdate({_id: ObjectId(id)}, { $set: action}, {returnOriginal: false})
      })
  }
  static deleteOne(id){
    return dbConnection()
      .then(db => {
        const Tvdb = db.collection("tv")
        return Tvdb.deleteOne({_id: ObjectId(id)})
      })
  }
}

module.exports = Tv