
const mongoose = require('./connection.js')


const BookSchema = new mongoose.Schema({
 title: String
})


const BookCollection = mongoose.model('Book', BookSchema)


function getAllBooks() {
  return BookCollection.find()
}

function getBook(bookId) {
  return BookCollection.findById(bookId)
}

function addNewBook(bookObject) {
  return BookCollection.create(bookObject)
}

function updateBook(bookId, bookObject) {
  return BookCollection.findByIdAndUpdate(bookId, bookObject)
}

function deleteBook(bookId) {
  return BookCollection.findByIdAndDelete(bookId)
}


module.exports = {
  getAllBooks,
  getBook,
  addNewBook,
  updateBook,
  deleteBook
}
