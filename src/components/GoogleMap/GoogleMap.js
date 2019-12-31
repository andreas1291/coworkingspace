import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import css from './GoogleMap.css';

export class GoogleMap extends Component {

  render() {
    return (
      <Map className={css.googleMap} google={this.props.google} zoom={14} initialCenter={this.props.initialCenter}>

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

        {/* <InfoWindow onClose={this.onInfoWindowClose}>
        </InfoWindow>  */}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCjPPg9zcsXBJg6D52ZIYsxUcaakSh2iJ8"),
})(GoogleMap)
