
const express = require('express')
const app = express()


const { libraryRouter } = require('./controllers/library.js')
const { bookRouter } = require('./controllers/book')


app.use(express.urlencoded({extended: true}))


app.use(express.json())



app.use(express.static(`${__dirname}/client/build`))



app.use('/api/libraries', libraryRouter)
app.use('/api/libraries/:libraryId//books', booksRouter)


app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`)
})


const PORT = process.env.PORT || 3001


app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`)
})
