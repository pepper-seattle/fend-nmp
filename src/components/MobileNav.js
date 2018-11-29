import React, {Component} from 'react';
import '../App.css';

const styles = {
  root: {
    backgroundColor: '#000',
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    height: '50px',
    position: 'fixed',
    // visibility: 'hidden',
  },
  title: {
    color: '#5df4f0',
    fontSize: '18px',
    margin: '15px',
    textAlign: 'center',
  },
  button: {
    float: 'left',
    right: '5px',
    backgroundColor: '#fff',
    color: '#585858',
    fontSize: '16px',
    fontWeight: 'bold',
    position: 'fixed',
    top: '10px',
    left: '10px',
    width: '60px',
    height: '30px',
    margin: '0',
    padding: '0',
    outline: 'none',
    zIndex: '10000',
  }
};

class MobileNav extends Component {
  render() {
    return(
      <div id="mobile-nav" style={styles.root}>
        <h1 id="title" style={styles.title}>Neighborhood Maps</h1>
        <button 
        id="mobile-sidebar-button" 
        onClick={() => {this.props.menuToggle()}} 
        style={styles.button}
        type="button">Filter</button>
      </div>
    )
  }
}

export default MobileNav;