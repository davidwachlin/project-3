const express = require('express')

const bookApi = require('../models/book')
const libraryApi = require('../models/library')

const bookRouter = express.Router({ mergeParams: true })

bookRouter.get('/', (req, res) => {
    const libraryId = req.params.libraryId
    bookApi.getBooksByLibraryId(libraryId)
        .then((books) => {
            res.json(books)
        })
})


bookRouter.post('/', (req, res) => {
    req.body.libraryId = req.params.libraryId
    bookApi.addNewBook(req.body)
        .then((book) => {
            res.json(book)
        })
})

bookRouter.get('/:bookId', (req, res) => {
    bookApi.getBook(req.params.bookId)
        .then((book) => {
            res.json(book)
        })
})

bookRouter.put('/:bookId', (req, res) => {
    bookApi.updateBook(req.params.bookId, req.body)
        .then((updatedBook) => {
            res.json(updatedBook)
        })
})

bookRouter.delete('/:bookId', (req, res) => {
    bookApi.deleteBook(req.params.bookId)
        .then((book) => {
            res.json(book)
        })
})


module.exports = {
    bookRouter
}