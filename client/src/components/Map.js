import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
    width: '450px',
    height: '350px',
  };

class MapContainer extends Component {

    
    render() {
        const { lat, long } = this.props
        return (
            <Map 
                google={this.props.google}
                zoom={17}
                style={mapStyles}
                initialCenter={{ lat: lat, lng: long }}
            >
                <Marker />
            </Map>
                
     
        )
    }
}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyDioWxiRRJ4R0Ppjxp-_E2wQfaJStGsFYI'
  })(MapContainer);