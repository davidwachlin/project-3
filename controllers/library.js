
const express = require('express')


const libraryApi = require('../models/library')


const libraryRouter = express.Router()


libraryRouter.get('/', (req, res) => {
  libraryApi.getAllLibraries()
    .then((libraries) => {
      res.json(libraries)
    })
})


libraryRouter.put('/:libraryId', (req, res) => {
  libraryApi.updateLibrary(req.params.libraryId, req.body)
    .then((updatedLibrary) => {
      res.json(updatedLibrary)
    })
})

libraryRouter.get('/:libraryId', (req, res) => {
  libraryApi.getLibrary(req.params.libraryId)
    .then((library) => {
      res.json(library)
    })
})

libraryRouter.post('/', (req, res) => {
  libraryApi.addNewLibrary(req.body)
    .then((library) => {
      res.json(library)
    })
})

libraryRouter.delete('/:libraryId', (req, res) => {
  libraryApi.deleteLibrary(req.params.libraryId)
    .then((library) => {
      res.json(library)
    })
})


module.exports = {
  libraryRouter
}
