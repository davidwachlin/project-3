import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button'

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
        axios.delete(`/api/libraries/${this.props.match.params.libraryId}/books/${this.props.match.params.bookId}`)
            .then(() => {
                this.setState({redirectToHome: true})
            })
    }

    render() {
        if (this.state.redirectToHome) {  
            return <Redirect to={`/${this.props.match.params.libraryId}`} />
        }
        return (
            
                this.state.isEditFormDisplayed
                ? 
                <form onSubmit={this.handleSubmit}>
                <Box>
				<TextField
					id='new-book-title'
					label='Title'
					type='text'
					name='title'
					autoComplete='title'
					margin='normal'
					variant='outlined'
					onChange={this.handleInputChange}
					value={this.state.book.title}
				/>
				</Box>
				<Box>
				<TextField
					id='new-book-author'
					label='Author'
					type='text'
					name='author'
					autoComplete='author'
					margin='normal'
					variant='outlined'
					onChange={this.handleInputChange}
					value={this.state.book.author}
				/>
				</Box>
				<Box>
				<TextField
					id='new-book-isbn'
					label='ISBN'
					type='text'
					name='isbn'
					autoComplete='isbn'
					margin='normal'
					variant='outlined'
					onChange={this.handleInputChange}
					value={this.state.book.isbn}
				/>
				</Box>
				<Box>
				<TextField
					id='new-book-description'
					label='Description'
					type='text'
					multiline
					rows='4'
					defaultValue='Description'
					margin='normal'
					variant='outlined'
					onChange={this.handleInputChange}
					value={this.state.book.description}
				/>
				</Box>
				<Box>
				<TextField
					id='new-book-imgUrl'
					label='Image URL'
					type='text'
					rows='4'
					defaultValue='Image URL'
					margin='normal'
					variant='outlined'
					onChange={this.handleInputChange}
					value={this.state.book.imgUrl}
				/>
				</Box>
				<input
        			id="submit-form"
        			type="submit"
      			/>
      			<label htmlFor="submit-form">
        			<Button variant="contained" component="span" >
          				Update Book
        			</Button>
					</label>
			</form>
                : <div>
                    <Link to={`/${this.props.match.params.libraryId}`}> Back </Link>
                    <button onClick={this.handleToggleEditForm}>Edit Book</button>
                    <button onClick={this.handleDeleteBook}>Delete Book</button>
                    <h2>{this.state.book.title}</h2>
                    <p>{this.state.book.author}</p>
                    <p>{this.state.book.isbn}</p>
                    <p>{this.state.book.description}</p>
                    <p>{this.state.book.imgUrl}</p>


                </div>
                
                
            
        )
    }
}
