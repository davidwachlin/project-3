import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import Books from './Books';
import MapContainer from './Map';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import './SingleLibrary.css';

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	paper: {
		margin: 'auto',
		marginTop: 20,
		lineHeight: "3rem"
	},
	img: {
		width: 350,
		height: 350
	}
});

class SingleLibrary extends Component {
	state = {
		library: {},
		isEditFormDisplayed: false,
		redirectToHome: false
	};

	componentDidMount() {
		axios
			.get(`api/libraries/${this.props.match.params.libraryId}`)
			.then(res => {
				this.setState({ library: res.data });
			});
	}

	handleInputChange = event => {
		const copiedLibrary = { ...this.state.library };
		copiedLibrary[event.target.name] = event.target.value;

		this.setState({ library: copiedLibrary });
	};

	handleSubmit = event => {
		event.preventDefault();
		axios
			.put(`api/libraries/${this.state.library._id}`, this.state.library)
			.then(res => {
				this.setState({
					library: res.data,
					isEditFormDisplayed: false
				});
			});
	};

	handleToggleEditForm = () => {
		this.setState(state => {
			return { isEditFormDisplayed: !state.isEditFormDisplayed };
		});
	};

	handleDeleteLibrary = () => {
		axios.delete(`api/libraries/${this.state.library._id}`).then(() => {
			this.setState({ redirectToHome: true });
		});
	};

	render() {
		if (this.state.redirectToHome) {
			return <Redirect to='/' />;
		}
		return this.state.isEditFormDisplayed ? (
			<Container style={{ marginTop: '2rem' }}>
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
								value={this.state.library.charter}
							/>
						</div>
						<Box id='steward-form'>
							<TextField
								onChange={this.handleInputChange}
								value={this.state.library.steward}
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
								value={this.state.library.address}
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
								value={this.state.library.city}
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
								value={this.state.library.zipcode}
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
								value={this.state.library.description}
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
								value={this.state.library.imgUrl}
							/>
						</div>
						<div id='form-submit'>
							<label htmlFor='submit-form'>
								<Button variant='contained' component='span'>
									Update Library
									<input
										id='submit-form'
										type='submit'
										style={{ display: 'none' }}

									/>
								</Button>
							</label>
						</div>

						<Button variant='contained' style={{marginTop: 15}}color="secondary" onClick={this.handleDeleteLibrary}>Delete Library</Button>

					</form>
				</Paper>
			</Container>
		) : (
			<div>
				<Paper className={this.props.classes.paper}>
					<Grid container>
						<Grid item xs>
							<img
								src={`${this.state.library.imgUrl}`}
								alt='placeholder'
								className={this.props.classes.img}
							/>
						</Grid>

						<Grid item xs container direction='column' spacing={2}>
							<Grid item xs style={{lineHeight: "2rem"}}>
								<Typography variant='h5'>
									<strong>Charter#: </strong>
									{this.state.library.charter}
								</Typography>
								<Typography variant='body1'>
									<strong>Steward:</strong> {this.state.library.steward}
								</Typography>
								<Typography variant='body1'>
									<strong>Description:</strong> {this.state.library.description}
								</Typography>
								<Typography variant='body1'>
									<strong>Address: </strong>
									{this.state.library.address}
								</Typography>
								<Typography variant='body1'>
									<strong>City: </strong>
									{this.state.library.city}
								</Typography>
								<Typography variant='body1'>
									<strong>Zipcode: </strong>
									{this.state.library.zipcode}
								</Typography>

								<Grid item xs>
									<Button variant="contained" onClick={this.handleToggleEditForm}>
										Edit
									</Button>
								</Grid>
							</Grid>
						</Grid>

						<Grid item xs>
							<MapContainer
								lat={this.state.library.lat}
								long={this.state.library.long}
							/>
						</Grid>
					</Grid>
				</Paper>

				<div>
					<Books libraryId={this.props.match.params.libraryId} />
				</div>
			</div>
		);
	}
}

SingleLibrary.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SingleLibrary);
