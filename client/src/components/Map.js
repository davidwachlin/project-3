import React, { Component } from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
    width: '450px',
    height: '350px',
  };

class MapContainer extends Component {
    render() {
        return (
            <Map 
                google={this.props.google}
                zoom={8}
                style={mapStyles}
                initialCenter={{ lat: 47.444, lng: -122.176}}
            >
                
            </Map>
        )
    }
}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyDioWxiRRJ4R0Ppjxp-_E2wQfaJStGsFYI'
  })(MapContainer);