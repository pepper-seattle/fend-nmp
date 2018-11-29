import React, { Component } from 'react';
import './App.css';

import {getLocations, googleMaps} from './utils';
import Modal from './components/Modal';
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

  openModal() {
    this.setState({modalIsOpen: true});
  }

  componentDidMount() {
    // let getImagesAPI = getImages();
    let googleMapsAPI = googleMaps();
    let getLocationsAPI = getLocations();

    Promise.all([
      // getImagesAPI,
      googleMapsAPI,
      getLocationsAPI
    ])
      .then(values => {
        console.log(values);
        let google = values[0];
        this.venues = values[1].response.venues;

        this.google = google;
        this.infoWindow = new google.maps.InfoWindow();
        this.markers = [];
        this.map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: this.venues[0].location.lat, lng: this.venues[0].location.lng},
          scrollwheel: true,
          zoom: 15
      });
      

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

          marker.addListener('click', () => {
            if(marker.getAnimation() !== null) {
              marker.setAnimation(null);
            }else{
              marker.setAnimation(google.maps.Animation.BOUNCE);
              setTimeout(() => {marker.setAnimation(null)}, 800);
            }
          });

          google.maps.event.addListener(marker, 'click', () => {
            this.infoWindow.setContent(marker.name);
            this.map.setZoom(17);
            this.map.setCenter(marker.position);
            this.infoWindow.open(this.map, marker);
            this.map.panBy(0, -125);
          });
          this.markers.push(marker);
        });
        this.setState({venues: this.venues});
      });
  }

  filterMarkers = (query) => {
    let filteredMarkers = this.venues.filter(venue => venue.name.toLowerCase().includes(query.toLowerCase()));
    this.markers.map(marker => {
      marker.name.toLowerCase().includes(query.toLowerCase()) == true ? marker.setVisible(true) : marker.setVisible(false)
    })
    this.setState({venues: filteredMarkers, query});
  }

  venueClick = (venue) => {
    let marker = this.markers.filter(marker => marker.id === venue.id)[0];
    this.infoWindow.open(this.map, marker);
    this.infoWindow.setContent(marker.name);
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
        <Modal
          modalIsOpen={false}
          onRequestClose={this.closeModal}
          contentLabel="An Error Has Occurred!" 
          />
        <SideBar
          venueClick={this.venueClick}
          filterMarkers={this.filterMarkers}
          venues={this.state.venues}
        />
        <main>
          <div id="map"></div>
        </main>
      </div>
    );
  }
}

export default App;
