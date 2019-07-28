import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'

export default class Books extends Component {
	state = {
		books: [],
		isNewFormDisplayed: false,
		newBook: {
			title: '',
			author: '',
			isbn: '',
			description: '',
			imgUrl: '',
		}
	};

	componentDidMount() {
		this.getAllBooks();
	}

	getAllBooks = () => {
		axios.get(`/api/libraries/${this.props.libraryId}/books`).then(res => {
			this.setState({ books: res.data });
		});
	};

	handleInputChange = event => {
		const newBook = { ...this.state.newBook };
		newBook[event.target.name] = event.target.value;

		this.setState({ newBook: newBook });
	};

	handleSubmit = event => {
		event.preventDefault();
		axios
			.post(`/api/libraries/${this.props.libraryId}/books`, this.state.newBook)
			.then(() => {
				this.setState({
					isNewFormDisplayed: false
				});
				this.getAllBooks();
			});
	};

	handleToggleNewForm = () => {
		this.setState(state => {
			return { isNewFormDisplayed: !state.isNewFormDisplayed };
		});
	};

	render() {
		let booksList = this.state.books.map(book => {
			return (
				<Grid item key={book._id} className='books'>
					<Card>
						<CardActionArea>
							<CardMedia
								component='img'
								image={book.imgUrl}
								title='placeholder'
								className='bookcovers'
							/>
							<CardContent>
								<Link to={`/${this.props.libraryId}/books/${book._id}`}>
									{book.title}
								</Link>
							</CardContent>
						</CardActionArea>
					</Card>
				</Grid>
			);
		});
		return this.state.isNewFormDisplayed ? (
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
					value={this.state.newBook.title}
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
					value={this.state.newBook.author}
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
					value={this.state.newBook.isbn}
				/>
				</Box>
				<Box>
				<TextField
					id='new-book-description'
					label='Description'
					type='text'
					name='description'
					multiline
					rows='4'
					margin='normal'
					variant='outlined'
					onChange={this.handleInputChange}
					value={this.state.newBook.description}
				/>
				</Box>
				<Box>
				<TextField
					id='new-book-imgUrl'
					label='Image URL'
					type='text'
					name='imgUrl'
					margin='normal'
					variant='outlined'
					onChange={this.handleInputChange}
					value={this.state.newBook.imgUrl}
				/>
				</Box>
				<input
        			id="submit-form"
        			type="submit"
      			/>
      			<label htmlFor="submit-form">
        			<Button variant="contained" component="span" >
          				Add Book
        			</Button>
					</label>
			</form>
		) : (
			<div>
				<Tooltip title='Add Book' aria-label='add'>
					<Fab size='small' color='primary'>
						<AddIcon onClick={this.handleToggleNewForm} />
					</Fab>
				</Tooltip>

				<Container>
				<Grid container spacing={4}>
					{booksList}
				</Grid>
				</Container>
			</div>
		);
	}
}
