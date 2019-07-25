import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import Books from "./Books";
import Container from "@material-ui/core/Container";
import MapContainer from "./Map";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { withStyles } from "@material-ui/styles";

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	paper: {
		margin: 'auto',

	},
	image: {
		width: 350,
		height: 350
	},
	img: {
		margin: "auto",
		display: "block",
		maxWidth: "100%",
		maxHeight: "100%"
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
	// getAllBooks = () => {
	//     axios.get(`/api/libraries/${this.props.match.params.libraryId}/books`)
	//         .then((res) => {
	//         this.setState({ books: res.data })
	//     })
	// }
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
			<form onSubmit={this.handleSubmit}>
				<div id='name-form'>
					<label htmlFor='library-name'>Name: </label>
					<input
						type='text'
						id='library-name'
						name='name'
						onChange={this.handleInputChange}
						value={this.state.library.name}
					/>
				</div>
				<div>
					<label htmlFor='library-address'>Address:</label>
					<input
						type='text'
						id='library-address'
						name='address'
						onChange={this.handleInputChange}
						value={this.state.library.address}
					/>
				</div>
				<div>
					<label htmlFor='library-city'>City:</label>
					<input
						type='text'
						id='library-city'
						name='city'
						onChange={this.handleInputChange}
						value={this.state.library.city}
					/>
				</div>
				<div id='zipcode-form'>
					<label htmlFor='library-zipCode'>Zipcode:</label>
					<input
						type='text'
						id='library-zipCode'
						name='zipcode'
						onChange={this.handleInputChange}
						value={this.state.library.zipcode}
					/>
				</div>
				<div id='charter-form'>
					<label htmlFor='library-charter'>Charter Number:</label>
					<input
						type='text'
						id='library-charter'
						name='charter'
						onChange={this.handleInputChange}
						value={this.state.library.charter}
					/>
				</div>
				<div id='description-form'>
					<label htmlFor='library-description'>Description:</label>
					<input
						type='text'
						id='library-description'
						name='description'
						onChange={this.handleInputChange}
						value={this.state.library.description}
					/>
				</div>
				<div id='form-submit'>
					<input type='submit' value='Save Changes' />
				</div>

				<button onClick={this.handleDeleteLibrary}>Delete Library</button>
			</form>
		) : (
			<div className={this.props.classes.root}>
				<Paper className={this.props.classes.paper}>
                    <Grid 
                    container
                    
                    >
						<Grid item xs>
							<ButtonBase className={this.props.classes.image}>
								<img
									src='https://via.placeholder.com/350'
									alt='placeholder'
									className={this.props.classes.img}
								/>
							</ButtonBase>
						</Grid>

						<Grid item xs container direction='column'>
							<Grid item>
								<Typography variant='subtitle1'>
									<h2>{this.state.library.name}</h2>
								</Typography>
								<Typography variant='body2'>
									<strong>Description:</strong> {this.state.library.description}
								</Typography>
								<p>
									<strong>Address: </strong>
									{this.state.library.address}
								</p>
								<p>
									<strong>City: </strong>
									{this.state.library.city}
								</p>
								<p>
									<strong>Zipcode: </strong>
									{this.state.library.zipcode}
								</p>
								<p>
									<strong>Charter: </strong>
									{this.state.library.charter}
								</p>
								<Grid item>
									<button onClick={this.handleToggleEditForm}>
										Edit Library
									</button>
								</Grid>
							</Grid>
						</Grid>

						<Grid item xs>
							<MapContainer />
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
