/* Step 1 import React, { Component } and axios
 *
 */
import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


/* Step 2
 * Rename this class to reflect the component being created
 *
 */
export default class Books extends Component {

    state = {
        books: [],
        isNewFormDisplayed: false,
        newBook: {
            name: "",
            description: ""
        }
    }
    
    componentDidMount() {
       this.getAllBooks();
    }

    getAllBooks = () => {
        axios.get('/api/books')
        .then((res) => {
            this.setState({ books: res.data })
        })
    }


    handleInputChange = (event) => {
        const newBook = { ...this.state.newBook }
        newBook[event.target.name] = event.target.value

        this.setState({ newBook: newBook })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        axios.post(`api/books`, this.state.newBook)
            .then(() => {
                this.setState({
                    isNewFormDisplayed: false
                })
                this.getAllBooks()
            })
    }

    handleToggleNewForm = () => {
        this.setState((state) => {
            return { isNewFormDisplayed: !state.isNewFormDisplayed }
        })
    }


    render() {
        let booksList = this.state.books.map((book) => {
            return (
                <div className="books">
                <Link
                    key={book._id}
                    to={`/${book._id}`}
                >
                    {book.name}
                </Link>
                </div>
            )
        })
        return (
            this.state.isNewFormDisplayed
                ? <form onSubmit={this.handleSubmit}>
                    <label htmlFor="new-book-name">Create Name</label>
                    <input
                        type="text"
                        id="new-book-name"
                        name="name"
                        onChange={this.handleInputChange}
                        value={this.state.newBook.name}
                    />
                    <label htmlFor="new-book-description">Create Description</label>
                    <input
                        type="text"
                        id="new-book-description"
                        name="description"
                        onChange={this.handleInputChange}
                        value={this.state.newBook.description}
                    />
                    <input type="submit" value="Create Book" />
                </form>


                :<div>
                    <button onClick={this.handleToggleNewForm}>New Book</button>
                    <hr></hr>
                    {booksList}
                </div>
        )
    }
}

