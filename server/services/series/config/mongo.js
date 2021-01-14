const { MongoClient } = require('mongodb')
const url = "mongodb://localhost:27017"
const client = new MongoClient(url, { useUnifiedTopology: true })
const databaseName = 'EntertainMe'
client.connect((e) => {
  if (e) console.log('db: connection error!')
  else console.log('db: connection success!')
})

const db = client.db(databaseName)

module.exports = db