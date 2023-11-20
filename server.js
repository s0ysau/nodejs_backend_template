require('dotenv').config()

// initate route/routeController
const express = require('express')
// allows Delete and Put requests
const methodOverride = require('method-override')
// instantiates express
const app = express()
// instantiates mongoose
const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true })) // this makes req.body work


// Mount Routes
app.get('/', (req, res) => {
    res.send('Hello World')
})


// tells the app to listen to the port above
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
