
const mongoose = require('./connection.js')


const LibrarySchema = new mongoose.Schema({
  charter: Number,
  steward: String,
  address: String,
  city: String,
  zipcode: String,
  description: String,
  imgUrl: String,
  lat: String,
  long: String
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

function deleteAllLibraries() {
  return LibraryCollection.deleteMany()
}

function addLibraries(libraries) {
  return LibraryCollection.create(libraries)
}



module.exports = {
  getAllLibraries,
  getLibrary,
  addNewLibrary,
  updateLibrary,
  deleteLibrary,
  deleteAllLibraries,
  addLibraries
}
