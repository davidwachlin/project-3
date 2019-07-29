import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Libraries.css';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { ListItem } from '@material-ui/core';
import List from '@material-ui/core/List';



export default class Libraries extends Component {
	state = {
		libraries: [],
		isNewFormDisplayed: false,
		newLibrary: {
			charter: '',
			steward: '',
			address: '',
			city: '',
			zipcode: '',
			description: '',
			imgUrl: ''
		}
	};

	componentDidMount() {
		this.getAllLibraries();
	}

	getAllLibraries = () => {
		axios.get('/api/libraries').then(res => {
			this.setState({ libraries: res.data });
		});
	};

	handleInputChange = event => {
		const newLibrary = { ...this.state.newLibrary };
		newLibrary[event.target.name] = event.target.value;

		this.setState({ newLibrary: newLibrary });
	};

	handleSubmit = event => {
		event.preventDefault();
		axios.post(`/api/libraries`, this.state.newLibrary).then(() => {
			this.setState({
				isNewFormDisplayed: false
			});
			this.getAllLibraries();
		});
	};

	handleToggleNewForm = () => {
		this.setState(state => {
			return { isNewFormDisplayed: !state.isNewFormDisplayed };
		});
	};

	render() {
		let librariesList = this.state.libraries.map(library => {
			return (
				<ListItem key={library._id}>
					<Card className='librarycard'>
						<CardMedia
							className="library-img"
							image={library.imgUrl}
							title='Library Image'
						/>
						<CardContent>
							<Typography gutterBottom variant='h5'>
								<Link to={`/${library._id}`}>Charter #{library.charter}</Link>
							</Typography>
							<Typography>{library.description}</Typography>
						</CardContent>
						<CardActions>
							<Button size='small' color='primary'>
								View
							</Button>
							<Button size='small' color='primary'>
								Edit
							</Button>
						</CardActions>
					</Card>
				</ListItem>

			);
		});
		return this.state.isNewFormDisplayed ? (
			<Container style={{marginTop: "2rem"}}>
				<Paper>
				<form onSubmit={this.handleSubmit}>
					<div id='charter-form'>
						<TextField
							id='outlined-charter-input'
							label='Charter Number'
							className='textField'
							type='text'
							name='charter'
							autoComplete='Charter'
							margin='normal'
							variant='outlined'
							onChange={this.handleInputChange}
							value={this.state.newLibrary.charter}
						/>
					</div>
					<Box id='steward-form'>
						<TextField
							onChange={this.handleInputChange}
							value={this.state.newLibrary.steward}
							id='outlined-steward-input'
							label='Steward'
							className='textField'
							type='text'
							name='steward'
							autoComplete='name'
							margin='normal'
							variant='outlined'
						/>
					</Box>
					<Box>
						<TextField
							id='outlined-address-input'
							label='Address'
							className='textField'
							type='text'
							name='address'
							autoComplete='Address'
							margin='normal'
							variant='outlined'
							onChange={this.handleInputChange}
							value={this.state.newLibrary.address}
						/>
					</Box>
					<Box>
						<TextField
							id='outlined-city-input'
							label='City'
							className='textField'
							type='text'
							name='city'
							autoComplete='City'
							margin='normal'
							variant='outlined'
							onChange={this.handleInputChange}
							value={this.state.newLibrary.city}
						/>
					</Box>
					<div id='zipcode-form'>
						<TextField
							id='outlined-zipcode-input'
							label='Zipcode'
							className='textField'
							type='text'
							name='zipcode'
							autoComplete='Zipcode'
							margin='normal'
							variant='outlined'
							onChange={this.handleInputChange}
							value={this.state.newLibrary.zipcode}
						/>
					</div>

					<div id='description-form'>
						<TextField
							id='outlined-description-input'
							label='Description'
							className='textField'
							type='text'
							name='description'
							autoComplete='description'
							margin='normal'
							variant='outlined'
							onChange={this.handleInputChange}
							value={this.state.newLibrary.description}
						/>
					</div>
					<div id='description-form'>
						<TextField
							id='outlined-imgUrl-input'
							label='Image URL'
							className='textField'
							type='text'
							name='imgUrl'
							autoComplete='imgUrl'
							margin='normal'
							variant='outlined'
							onChange={this.handleInputChange}
							value={this.state.newLibrary.imgUrl}
						/>
					</div>
					<div id='form-submit'>

						<label htmlFor='submit-form'>
							<Button variant='contained' component='span'>
								Create Library
								<input id='submit-form' type='submit' style={{display: "none"}}/>
							</Button>
						</label>
					</div>
				</form>
				</Paper>
			</Container>
		) : (
			<Container style={{marginTop: "2rem"}}>
				<Grid container spacing={2}>
					<Grid item xs={2}>
						<Paper>
							<Typography variant='h6'>About</Typography>
							<Typography variant='p' style={{lineHeight: "2rem"}}>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui,
								dolorem dignissimos. Tenetur placeat mollitia possimus
								blanditiis deleniti qui numquam, reprehenderit dignissimos
								voluptatibus doloribus quasi atque sunt aliquid ipsam aut
								laboriosam ipsa. Inventore, tempore, vitae delectus distinctio.
							</Typography>
						</Paper>
					</Grid>
					<Grid item xs={10}>
						<Paper>
							<Typography variant='h5' gutterBottom>
								All Libraries
							</Typography>
							<Button
								variant='contained'
								color='primary'
								onClick={this.handleToggleNewForm}>
								New Library
							</Button>
							<Box id='librarylist'>
								<List component='ul'>{librariesList}</List>
							</Box>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		);
	}
}
