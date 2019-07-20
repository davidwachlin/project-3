const express = require('express')

const bookApi = require('../models/book')
const libraryApi = require('../models/library')

const bookRouter = express.Router({mergeParams: true})

bookRouter.get('/', (req, res) => {
    const libraryId = req.params.libraryId
    bookApi.getBooksByLibraryId(libraryId)
        .then((books) => {
            res.json(books)
        })
})

