const express = require('express')
const app = express()
const port = 4000
const routes = require('./router')
const orchestratorController = require('./controllers/orchestratorController')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(routes)


app.get('/movies', orchestratorController.getMovies)
app.get('/tv', orchestratorController.getSeries)

app.listen(port, () => {
  console.log(`running on ${port}`)
})