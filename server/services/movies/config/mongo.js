const { MongoClient } = require('mongodb')
// const url = "mongodb://localhost:27017"
const url = "mongodb+srv://robby:lomiver@cluster0.xqrrd.mongodb.net/test?retryWrites=true&w=majority"
function dbConnection() {
  return new Promise((resolve, reject) => {
    const client = new MongoClient(url, { useUnifiedTopology: true })
    const databaseName = 'EntertainMe'
    client.connect(e => {
      if (e) {
        console.log('db: connection error!')
        console.log(e)
      }
      else {
        console.log('db: connection success!')
        const db = client.db(databaseName)
        resolve(db)
      }
    })
  })
  
}



module.exports = dbConnection