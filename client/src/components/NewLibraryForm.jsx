import React, { Component } from "react";
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default class NewLibraryForm extends Component {
	render() {
		return (
			<React.Fragment>
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
						<label htmlFor='new-library-city'>City:</label>
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
						{/* <label htmlFor='new-library-zipCode'>Zipcode:</label> */}
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
					<div id='form-submit'>
						<input type='submit' value='Create Library' />
					</div>
				</form>
			</React.Fragment>
		);
	}
}

import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function AddressForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="name"
            label="First name"
            fullWidth
            autoComplete="fname"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="lname"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="billing address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="billing address-line2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="billing address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="state" name="state" label="State/Province/Region" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="billing postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="billing country"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}