import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Libraries.css";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

export default class Libraries extends Component {
	state = {
		libraries: [],
		isNewFormDisplayed: false,
		newLibrary: {
			name: "",
			address: "",
			city: "",
			zipcode: "",
			charter: "",
			description: ""
		}
	};

	componentDidMount() {
		this.getAllLibraries();
	}

	getAllLibraries = () => {
		axios.get("/api/libraries").then(res => {
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
				<Card key={library._id} className='libraries'>
					<Link to={`/${library._id}`}>{library.name}</Link>
					<p>{library.address}</p>
					<p>{library.city}</p>
					<p>{library.zipcode}</p>
					<p>{library.charter}</p>
					<p>{library.description}</p>
				</Card>
			);
		});
		return this.state.isNewFormDisplayed ? (
			<Container>
				<form onSubmit={this.handleSubmit}>
					<Box id='name-form'>
						<label htmlFor='new-library-name'>Name: </label>
						<TextField
							onChange={this.handleInputChange}
							value={this.state.newLibrary.name}
							id='outlined-name-input'
							label='Name'
							className='textField'
							type='text'
							name='name'
							autoComplete='name'
							margin='normal'
							variant='outlined'
						/>
					</Box>
					<Box>
						<label htmlFor='new-library-address'>Address:</label>
						<TextField
							id='outlined-address-input'
							label='address'
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
						<label htmlFor='new-library-city'>City:</label>
						<TextField
							id='outlined-city-input'
							label='city'
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
						{/* <label htmlFor='new-library-zipCode'>Zipcode:</label> */}
						<TextField
							id='outlined-zipcode-input'
							label='zipcode'
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
					<div id='charter-form'>
						<label htmlFor='new-library-charter'>Charter Number:</label>
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
					<div id='description-form'>
						<label htmlFor='new-library-description'>Description: </label>
						<TextField
							id='outlined-description-input'
							label='description'
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
					<div id='form-submit'>
						<input type='submit' value='Create Library' />
					</div>
				</form>
			</Container>
		) : (
			<Container>
				<Grid container spacing={3}>
				<Grid item xs={3}>
						<Container>
							<h3>About</h3>

						</Container>
					</Grid>
					<Grid item xs={9}>
				
					
								<Button
									variant='contained'
									color='primary'
									onClick={this.handleToggleNewForm}>
									New Library
								</Button>
				
			
							<Paper>{librariesList}</Paper>
					
					</Grid>

				</Grid>
			</Container>
		);
	}
}
