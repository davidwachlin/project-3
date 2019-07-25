import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core'



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
        axios.get(`/api/libraries/${this.props.libraryId}/books`)
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
        axios.post(`/api/libraries/${this.props.libraryId}/books`, this.state.newBook)
            .then(() => {
                this.setState({
                    isNewFormDisplayed: false
                })
                this.getAllBooks();

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
                <div key={book._id} className="books">
                <Card>
                <Link
                    to={`/${this.props.libraryId}/books/${book._id}`}
                >
                    {book.name}
                </Link>
                </Card>
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
                    <Grid container>
                    {booksList}


                    </Grid>
                </div>
        )
    }
}

