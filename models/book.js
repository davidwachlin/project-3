
const mongoose = require('./connection.js')


const BookSchema = new mongoose.Schema({
 title: String,
 author: String,
 isbn: String,
 description: String,
 imgUrl: "",

 libraryId: mongoose.Types.ObjectId
})


const BookCollection = mongoose.model('Book', BookSchema)

function getAllBooks() {
  BookCollection.find()
}

function getBooksByLibraryId(libraryId) {
  return BookCollection.find({libraryId: libraryId})
}

function getBook(bookId) {
  return BookCollection.findById(bookId)
}

function addNewBook(bookObject) {
  return BookCollection.create(bookObject)
}

function updateBook(bookId, bookObject) {
  return BookCollection.findByIdAndUpdate(bookId, bookObject, {new: true})
}

function deleteBook(bookId) {
  return BookCollection.findByIdAndDelete(bookId)
}


module.exports = {
  getAllBooks,
  getBooksByLibraryId,
  getBook,
  addNewBook,
  updateBook,
  deleteBook
}
