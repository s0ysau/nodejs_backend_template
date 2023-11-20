require('dotenv').config()
require('./config/database')
const express = require('express') // initate route/routeController
const path = require('path') // path module
const favicon = require('serve-favicon') // favicon middleware
const logger = require('morgan') // logger middleware
const app = express() // instantiates express

const port = process.env.PORT || 3000 // instantiates mongoose

// Middleware
app.use(express.json()) // allows us to use json
app.use((req, res, next) => {
  res.locals.data = {}
  next()
})

app.use(logger('dev'))
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico' )))
app.use(express.static(path.join(__dirname, 'build')))

app.use(require('./config/checkToken')) // middleware to check for token
// Middleware


// Mount Routes
app.get('/api/test', (req, res) => {
    res.send('Hello World')
})

app.get('*', (res, req) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

// tells the app to listen to the port above
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
