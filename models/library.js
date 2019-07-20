
const mongoose = require('./connection.js')


const LibrarySchema = new mongoose.Schema({
 name: String,
 description: String
})


const LibraryCollection = mongoose.model('Library', LibrarySchema)


function getAllLibraries() {
  return LibraryCollection.find()
}

function getLibrary(libraryId) {
  return LibraryCollection.findById(libraryId)
}

function addNewLibrary(libraryObject) {
  return LibraryCollection.create(libraryObject)
}

function updateLibrary(libraryId, updatedLibrary) {
  return LibraryCollection.findByIdAndUpdate(libraryId, updatedLibrary, {new: true})
}

function deleteLibrary(libraryId) {
  return LibraryCollection.findByIdAndDelete(libraryId)
}


module.exports = {
  getAllLibraries,
  getLibrary,
  addNewLibrary,
  updateLibrary,
  deleteLibrary
}
