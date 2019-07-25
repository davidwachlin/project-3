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

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles(theme => ({
  root: {
	flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function ComplexGrid() {
  const classes = useStyles();

  return (
	<div>
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src="/static/images/grid/complex.jpg" />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  Standard license
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Full resolution 1920x1080 • JPEG
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ID: 1030114
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  Remove
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">$19.00</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>

  );
}
