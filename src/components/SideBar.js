import React, {Component} from 'react';

const styles = {
  list: {
    listStyle: 'none',
    padding: '0',
  },
  queryInput: {
    margin: '20px 0 5px',
  },
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
  title: {
    color: '#000',
    fontSize: '18px',
  },
  titleSection: {
    backgroundColor: '#fff',
    borderBottom: '2px solid',
    padding: '5px',
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
      <section id="side-bar" style={styles.root}>
        {window.innerWidth > 550 ? <section id="title-section" style={styles.titleSection}><h1 id="title" style={styles.title} tabIndex="0">Neighborhood Maps</h1></section> : ''}
        <input aria-label="query venue input" id="query-venues-input" style={styles.queryInput} value={this.props.query} onChange={(e) => {this.props.filterMarkers(e.target.value)}} placeholder="Find your food!" />
        <ul id="venues-list" style={styles.list}>
        {/* Sets up the list of venues in the sidebar with important info */}
          {
            this.props.venues && this.props.venues.length > 0 && this.props.venues.map((venue, i) => (
              <li key={i} id="side-bar-venue" style={styles.venues} onClick={() => { this.props.venueClick(venue)}} tabIndex="0">
                <h3 tabIndex="0">{venue.name}</h3>
                <p id="venue-address" style={styles.venueAddress} tabIndex="0">{venue.location.formattedAddress[0]}</p>
                <p id="venue-address" style={styles.venueAddress} tabIndex="0">{venue.location.formattedAddress[1]}</p>
              </li>
            ))
          }
        </ul>
      </section>
    )
  }
};

export default SideBar;