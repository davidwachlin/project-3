import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card'

export default class SingleBook extends Component {
	state = {
		book: {},
		isEditFormDisplayed: false,
		redirectToHome: false
	};

	componentDidMount() {
		axios
			.get(
				`/api/libraries/${this.props.match.params.libraryId}/books/${
					this.props.match.params.bookId
				}`
			)
			.then(res => {
				this.setState({ book: res.data });
			});
	}

	handleInputChange = event => {
		const copiedBook = { ...this.state.book };
		copiedBook[event.target.name] = event.target.value;

		this.setState({ book: copiedBook });
	};

	handleSubmit = event => {
		event.preventDefault();
		axios
			.put(
				`/api/libraries/${this.props.match.params.libraryId}/books/${
					this.props.match.params.bookId
				}`,
				this.state.book
			)
			.then(res => {
				this.setState({
					book: res.data,
					isEditFormDisplayed: false
				});
			});
	};

	handleToggleEditForm = () => {
		this.setState(state => {
			return { isEditFormDisplayed: !state.isEditFormDisplayed };
		});
	};

	handleDeleteBook = () => {
		axios
			.delete(
				`/api/libraries/${this.props.match.params.libraryId}/books/${
					this.props.match.params.bookId
				}`
			)
			.then(() => {
				this.setState({ redirectToHome: true });
			});
	};

	render() {
		if (this.state.redirectToHome) {
			return <Redirect to={`/${this.props.match.params.libraryId}`} />;
		}
		return this.state.isEditFormDisplayed ? (
			<Container>
				<Paper style={{marginTop: "2rem"}}>


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

				<label htmlFor='submit-form'>
					<Button variant='contained' component='span'>
						Update Book
						<input id='submit-form' type='submit' style={{display: "none"}}/>
					</Button>
				</label>
			</form>
			</Paper>
			</Container>
		) : (
			<Container>
				<Card style={{ marginTop: '2rem', paddingTop: "1rem" }}>
					<Grid container>
						<Grid item xs>
							<img src={this.state.book.imgUrl} alt='book cover' />
						</Grid>

						<Grid item xs container direction='column' spacing={2} >
							<div style={{maxWidth: "90%"}}>
							<List>
								<ListItem>
									<h2>{this.state.book.title}</h2>
								</ListItem>
								<Divider variant='inset' component='li' />
								<ListItem>
									<p>{this.state.book.author}</p>
								</ListItem>
								<ListItem>
									<p>{this.state.book.isbn}</p>
								</ListItem>
								<ListItem>
									<p>{this.state.book.description}</p>
								</ListItem>
								
							</List>
							</div>
						</Grid>
					</Grid>


<div>
						<Button variant='contained' style={{marginTop: 15}} onClick={this.handleToggleEditForm}>Edit Book</Button>
						</div>
						<div>
						<Button variant='contained' style={{marginTop: 15}}color="secondary" onClick={this.handleDeleteBook}>Delete Book</Button>
						</div>
						<Button style={{marginTop: 15}} variant='contained'>
						<Link to={`/${this.props.match.params.libraryId}`}> Back </Link>
						</Button>
				</Card>
			</Container>
		);
	}
}
