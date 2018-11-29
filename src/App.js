import React, { Component } from 'react';
import './App.css';

import {getImages, getLocations, googleMaps} from './utils';
import ErrorModal from './components/ErrorModal';
import SideBar from './components/SideBar';
import MobileNav from './components/MobileNav';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      query: ''
    }
  };

  componentDidMount() {
    let googleMapsAPI = googleMaps();
    let getLocationsAPI = getLocations();

    Promise.all([
      googleMapsAPI,
      getLocationsAPI,
    ])
      .then(values => {
        console.log(values);
        let google = values[0];
        this.venues = values[1].response.venues;

        this.google = google;
        this.infoWindow = new google.maps.InfoWindow();
        this.infoWinContents = [];
        this.markers = [];
        this.map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: this.venues[0].location.lat, lng: this.venues[0].location.lng},
          scrollwheel: true,
          zoom: 15
        })
      
      

        this.venues.map(venue => {
          let marker = new google.maps.Marker({
            animation: google.maps.Animation.DROP,
            icon: {url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"},
            id: venue.id,
            location: venue.location.formattedAddress,
            map: this.map,
            name: venue.name,
            position: {lat: venue.location.lat , lng: venue.location.lng},
          });

          let infoWinContent = '<div id="info-window">' +
            '<h3 id="marker-name">' + venue.name + '</h3>' +
            '<p id="marker-address">' + venue.location.formattedAddress[0] + '</p>' +
            '<p id="marker-address">' + venue.location.formattedAddress[1] + '</p>' +
            '<img id="marker-image" ' + '" src="' + getImages(venue) + '" alt="' + venue.name + '" />' +
            '</div>';

          marker.addListener('click', () => {
            if(marker.getAnimation() !== null) {
              marker.setAnimation(null);
            }else{
              marker.setAnimation(google.maps.Animation.BOUNCE);
              setTimeout(() => {marker.setAnimation(null)}, 800);
            }
          });

          google.maps.event.addListener(marker, 'click', () => {
            this.infoWindow.setContent(infoWinContent);
            this.map.setZoom(17);
            this.map.setCenter(marker.position);
            this.infoWindow.open(this.map, marker);
            this.map.panBy(0, -125);
          });
          this.markers.push(marker);
          this.infoWinContents.push({ id: venue.id, name: venue.name, contents: infoWinContent});
        });
        this.setState({venues: this.venues});
      })
      .catch(function(error) {
        this.setState({ modalIsOpen: true });
        return error;
      });
  }

  filterMarkers = (query) => {
    let filteredMarkers = query ? this.venues.filter(venue => venue.name.toLowerCase().includes(query.toLowerCase())) : this.venues;
    this.markers.map(marker => {
      marker.name.toLowerCase().includes(query.toLowerCase()) == true ? marker.setVisible(true) : marker.setVisible(false)
    })
    this.setState({venues: filteredMarkers, query});
  }

  venueClick = (venue) => {
    let marker = this.markers.filter(marker => marker.id === venue.id)[0];
    let infoContent = this.infoWinContents.filter(infoWinContent => infoWinContent.id === marker.id)[0]; 
    let infoWinContent = infoContent.contents;
    this.infoWindow.open(this.map, marker);
    this.infoWindow.setContent(infoWinContent);
    this.map.setZoom(17);
    this.map.setCenter(marker.position);
    if(marker.getAnimation() !== null) {
      marker.setAnimation(null);
    }else{
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
      setTimeout(() => {marker.setAnimation(null)}, 800);
    }
  }

  menuToggle = () => {
    let sideBar = document.getElementById("side-bar");

    if(sideBar.style.visibility === "hidden") {
      sideBar.style.visibility = "visible";
    }else{
      sideBar.style.visibility = "hidden";
    }
  }

  render() {
    return (
      <div className="App">
        <MobileNav menuToggle={this.menuToggle} />
        <ErrorModal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="An Error Has Occurred!" 
          />
        <SideBar
          venueClick={this.venueClick}
          filterMarkers={this.filterMarkers}
          venues={this.state.venues}
        />
        <main>
          <div aria-hidden="true" id="map" role="application"></div>
        </main>
      </div>
    );
  }
}

export default App;
