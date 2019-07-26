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

export default class Books extends Component {
	state = {
		books: [],
		isNewFormDisplayed: false,
		newBook: {
			name: "",
			description: ""
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
								component="img"
								image='https://via.placeholder.com/100x140'
								title='placeholder'
							/>
							<CardContent>
								<Link to={`/${this.props.libraryId}/books/${book._id}`}>
									{book.name}
								</Link>
							</CardContent>
						</CardActionArea>
					</Card>
				</Grid>
			);
		});
		return this.state.isNewFormDisplayed ? (
			<form onSubmit={this.handleSubmit}>
				<label htmlFor='new-book-name'>Create Name</label>
				<input
					type='text'
					id='new-book-name'
					name='name'
					onChange={this.handleInputChange}
					value={this.state.newBook.name}
				/>
				<label htmlFor='new-book-description'>Create Description</label>
				<input
					type='text'
					id='new-book-description'
					name='description'
					onChange={this.handleInputChange}
					value={this.state.newBook.description}
				/>
				<input type='submit' value='Create Book' />
			</form>
		) : (
			<div>
				<Tooltip title='Add Book' aria-label='add'>
					<Fab size='small' color='primary'>
						<AddIcon onClick={this.handleToggleNewForm} />
					</Fab>
				</Tooltip>
				{/* <button onClick={this.handleToggleNewForm}>New Book</button> */}
				<Grid container spacing={4}>
					{booksList}
				</Grid>
			</div>
		);
	}
}
