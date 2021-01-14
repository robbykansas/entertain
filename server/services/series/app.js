const express = require('express')
const app = express()
const routes = require('./routes')
const port = 4002

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(routes)

app.listen(port, () => {
  console.log(`running on ${port}`)
})