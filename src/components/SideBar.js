import React, {Component} from 'react';

const styles = {
  root: {
    backgroundColor: '#5df4f0',
    width: '250px',
    maxWidth: '100%',
    minHeight: '600px',
    maxHeight: '100vh',
    position: 'fixed',
    overflowY: 'scroll',
    left: '0',
    zIndex: '1',
  },
  queryInput: {
    margin: '10px 0 5px',
  },
  venues: {
    backgroundColor: '#fff',
    border: '2px solid #000',
    color: '#000',
    width: '200px',
    height: '150px',
    padding: '5px',
    margin: '5px 10px',
  },
  venueAddress: {
    color: '#2d8adb',
    fontSize: '14px',
    margin: '2px',
  }
}

class SideBar extends Component {
  render() {
    return(
      <div id="side-bar" style={styles.root}>
        <input id="query-input" style={styles.queryInput} value={this.props.query} onChange={(e) => {this.props.filterMarkers(e.target.value)}} placeholder="Find your food!" />
        <div>
          {
            this.props.venues && this.props.venues.length > 0 && this.props.venues.map((venue, i) => (
              <div key={i} id="side-bar-venue" style={styles.venues} onClick={() => { this.props.venueClick(venue)}}>
                <h3>{venue.name}</h3>
                <p id="venue-address" style={styles.venueAddress}>{venue.location.formattedAddress[0]}</p>
                <p id="venue-address" style={styles.venueAddress}>{venue.location.formattedAddress[1]}</p>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
};

export default SideBar;