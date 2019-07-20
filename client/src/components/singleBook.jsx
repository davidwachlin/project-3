import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

export default class SingleBook extends Component {
    
    state = {
        book: {},
        isEditFormDisplayed: false,
        redirectToHome: false
    }

    componentDidMount() {
        axios.get(`/api/libraries/${this.props.match.params.libraryId}/books/${this.props.match.params.bookId}`)
            .then((res) => {
                this.setState({book: res.data})
            })
    }

    handleInputChange = (event) => {
        const copiedBook = {...this.state.book}
        copiedBook[event.target.name] = event.target.value

        this.setState({book: copiedBook})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        axios.put(`/api/libraries/${this.props.match.params.libraryId}/books/${this.props.match.params.bookId}`, this.state.book)
            .then((res) => {
                this.setState({
                    book: res.data,
                    isEditFormDisplayed: false
                })
            })
    }

    handleToggleEditForm = ()  => {
        this.setState((state) => {
            return {isEditFormDisplayed: !state.isEditFormDisplayed}
        })
    }

    handleDeleteBook = () => {
        axios.delete(`/api/libraries/${this.props.match.params.libraryId}/books/${this.state.bookId}`)
            .then(() => {
                this.setState({redirectToHome: true})
            })
    }

    render() {
        if (this.state.redirectToHome) {  
            return <Redirect to="/" />
        }
        return (
            
                this.state.isEditFormDisplayed
                ? <form onSubmit={this.handleSubmit}>
                    <label htmlFor="book-name">Create Name</label>
                    <input 
                        type="text" 
                        id="book-name" 
                        name="name" 
                        onChange={this.handleInputChange}
                        value={this.state.book.name}
                    />
                    <label htmlFor="book-description">Create Name</label>
                    <input 
                        type="text" 
                        id="book-description" 
                        name="description" 
                        onChange={this.handleInputChange}
                        value={this.state.book.description}
                    />
                    <input type="submit" value="Update Book" />
                </form>
                : <div>
                    <button onClick={this.handleToggleEditForm}>Edit Book</button>
                    <button onClick={this.handleDeleteBook}>Delete Book</button>
                    <h2>{this.state.book.name}</h2>
                    <p>{this.state.book.description}</p>
                </div>
                
                
            
        )
    }
}
