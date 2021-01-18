const db = require('../config/mongo')
const Tvdb = db.collection("tv")
const {ObjectId} = require('mongodb')

class Tv {
  static find(){
    return Tvdb.find().toArray()
  }
  static findOne(id){
    return Tvdb.findOne({_id: ObjectId(id)})
  }
  static insertOne(data){
    return Tvdb.insertOne(data)
  }
  static findOneAndUpdate(id, action){
    return Tvdb.findOneAndUpdate({_id: ObjectId(id)}, { $set: action}, {returnOriginal: false})
  }
  static deleteOne(id){
    return Tvdb.deleteOne({_id: ObjectId(id)})
  }
}

module.exports = Tv