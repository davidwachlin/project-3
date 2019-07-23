import React, { Component } from "react";
import Container from '@material-ui/core/Container'

export default class NewLibraryForm extends Component {
	render() {
		return (
			<Container>
				<form onSubmit={this.handleSubmit}>
					<div id='name-form'>
						<label htmlFor='new-library-name'>Name: </label>
						<input
							type='text'
							id='new-library-name'
							name='name'
							onChange={this.handleInputChange}
							value={this.state.newLibrary.name}
						/>
					</div>
					<div>
						<label htmlFor='new-library-address'>Address:</label>
						<input
							type='text'
							id='new-library-address'
							name='address'
							onChange={this.handleInputChange}
							value={this.state.newLibrary.address}
						/>
					</div>
					<div>
						<label htmlFor='new-library-city'>City:</label>
						<input
							type='text'
							id='new-library-city'
							name='city'
							onChange={this.handleInputChange}
							value={this.state.newLibrary.city}
						/>
					</div>
					<div id='zipcode-form'>
						<label htmlFor='new-library-zipCode'>Zipcode:</label>
						<input
							type='text'
							id='new-library-zipCode'
							name='zipcode'
							onChange={this.handleInputChange}
							value={this.state.newLibrary.zipcode}
						/>
					</div>
					<div id='charter-form'>
						<label htmlFor='new-library-charter'>Charter Number:</label>
						<input
							type='text'
							id='new-library-charter'
							name='charter'
							onChange={this.handleInputChange}
							value={this.state.newLibrary.charter}
						/>
					</div>
					<div id='description-form'>
						<label htmlFor='new-library-description'>Description: </label>
						<input
							type='text'
							id='new-library-description'
							name='description'
							onChange={this.handleInputChange}
							value={this.state.newLibrary.description}
						/>
					</div>
					<div id='form-submit'>
						<input type='submit' value='Create Library' />
					</div>
				</form>
			</Container>
		);
	}
}
