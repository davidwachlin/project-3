const bookApi = require('./book')
const libraryApi = require('./library')

const library = {
  charter: 3610,
  steward: '',
  address: '1359 McLendon Ave NE',
  city: 'Atlanta',
  zipcode: '30307',
  description: 'Great location in Candler Park',
  imgUrl: 'https://i.imgur.com/Oedu2Mu.jpg',
  lat: '33.76459',
  long: '-84.34307'
}

const library2 = {
  charter: 6242,
  steward: '',
  address: '151 Olympic Place',
  city: 'Decatur',
  zipcode: '30030',
  description: 'Olympic Place Little Library',
  imgUrl: 'https://i.imgur.com/4jGXCWI.jpg',
  lat: '33.76478',
  long: '-84.30494'

}

const book = {
  isbn: '9781593275846',
  title: 'Eloquent JavaScript, Second Edition',
  sutitle: 'A Modern Introduction to Programming',
  author: 'Marijn Haverbeke',
  published: '2014-12-14T00:00:00.000Z',
  publisher: 'No Starch Press',
  pages: 472,
  description: 'JavaScript lies at the heart of almost every modern web application, from social apps to the newest browser-based games. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.',
  website: 'http://eloquentjavascript.net/',
  imgUrl: 'https://i.imgur.com/lgZmHak.jpg',
  libraryId: ''
}

const books = [
  {
    isbn: '9781593275846',
    title: 'Eloquent JavaScript, Second Edition',
    sutitle: 'A Modern Introduction to Programming',
    author: 'Marijn Haverbeke',
    published: '2014-12-14T00:00:00.000Z',
    publisher: 'No Starch Press',
    pages: 472,
    description: 'JavaScript lies at the heart of almost every modern web application, from social apps to the newest browser-based games. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.',
    website: 'http://eloquentjavascript.net/',
    imgUrl: 'https://i.imgur.com/lgZmHak.jpg',
    libraryId: ''
  },
  {
    isbn: '9781449331818',
    title: 'Learning JavaScript Design Patterns',
    sutitle: "A JavaScript and jQuery Developer's Guide",
    author: 'Addy Osmani',
    published: '2012-07-01T00:00:00.000Z',
    publisher: "O'Reilly Media",
    pages: 254,
    description: "With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you.",
    website: 'http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/',
    imgUrl: 'https://i.imgur.com/h2fJixN.jpg',
    libraryId: ''
  },
  {
    isbn: '9781449365035',
    title: 'Speaking JavaScript',
    sutitle: 'An In-Depth Guide for Programmers',
    author: 'Axel Rauschmayer',
    published: '2014-02-01T00:00:00.000Z',
    publisher: "O'Reilly Media",
    pages: 460,
    description: 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who once found himself in the same position.',
    website: 'http://speakingjs.com/',
    imgUrl: 'https://i.imgur.com/4aNEbuB.jpg',
    libraryId: ''
  },
  {
    isbn: '9781491950296',
    title: 'Programming JavaScript Applications',
    sutitle: 'Robust Web Architecture with Node, HTML5, and Modern JS Libraries',
    author: 'Eric Elliott',
    published: '2014-07-01T00:00:00.000Z',
    publisher: "O'Reilly Media",
    pages: 254,
    description: "Take advantage of JavaScript's power to build robust web-scale or enterprise applications that are easy to extend and maintain. By applying the design patterns outlined in this practical book, experienced JavaScript developers will learn how to write flexible and resilient code that's easier-yes, easier-to work with as your code base grows.",
    website: 'http://chimera.labs.oreilly.com/books/1234000000262/index.html',
    imgUrl: 'https://i.imgur.com/iEBeQyU.jpg',
    libraryId: ''
  },
  {
    isbn: '9781593277574',
    title: 'Understanding ECMAScript 6',
    sutitle: 'The Definitive Guide for JavaScript Developers',
    author: 'Nicholas C. Zakas',
    published: '2016-09-03T00:00:00.000Z',
    publisher: 'No Starch Press',
    pages: 352,
    description: 'ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that ECMAScript 6 brings to JavaScript.',
    website: 'https://leanpub.com/understandinges6/read',
    imgUrl: 'https://i.imgur.com/AmBamnE.jpg',
    libraryId: ''
  },
  {
    isbn: '9781491904244',
    title: "You Don't Know JS",
    sutitle: 'ES6 & Beyond',
    author: 'Kyle Simpson',
    published: '2015-12-27T00:00:00.000Z',
    publisher: "O'Reilly Media",
    pages: 278,
    description: "No matter how much experience you have with JavaScript, odds are you don’t fully understand the language. As part of the 'You Don’t Know JS' series, this compact guide focuses on new features available in ECMAScript 6 (ES6), the latest version of the standard upon which JavaScript is built.",
    website: 'https://github.com/getify/You-Dont-Know-JS/tree/master/es6%20&%20beyond',
    imgUrl: 'https://i.imgur.com/umnS8JH.jpg',
    libraryId: ''
  },
  {
    isbn: '9781449325862',
    title: 'Git Pocket Guide',
    sutitle: 'A Working Introduction',
    author: 'Richard E. Silverman',
    published: '2013-08-02T00:00:00.000Z',
    publisher: "O'Reilly Media",
    pages: 234,
    description: 'This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git experience.',
    website: 'http://chimera.labs.oreilly.com/books/1230000000561/index.html',
    imgUrl: 'https://i.imgur.com/wqeBwca.jpg',
    libraryId: ''
  }
]



bookApi.deleteAllBooks()
  .then(() => libraryApi.deleteAllLibraries())
  .then(() => libraryApi.addNewLibrary(library))
  .then((createdLibrary) => {
    book.libraryId = createdLibrary._id
    return bookApi.addNewBook(book)
  })
  .then(() => libraryApi.addNewLibrary(library2))
  .then((createdLibrary) => {
    const booksPromise = books.map(book => {
      book.libraryId = createdLibrary._id
      return bookApi.addNewBook(book)
    })
    return Promise.all(booksPromise)
  })

  .then(() => {
    process.exit()
  })
  .catch((err) => {
    console.log(err)
    process.exit()
  })


// bookApi.deleteAllBooks()
//   .then(() => libraryApi.deleteAllLibraries())
//   .then(() => libraryApi.addNewLibrary(library))
//   .then((createdLibrary) => {
//     return books.forEach((book) => {
//       book.libraryId = createdLibrary._id
//       bookApi.addNewBook(book)
//     })
//   })
//   // .then(() => libraryApi.addNewLibrary(library2))
//   .then(() => {
//     process.exit()
//   })
//   .catch((err) => {
//     console.log(err)
//     process.exit()
//   })

