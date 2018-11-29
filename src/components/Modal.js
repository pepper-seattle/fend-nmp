import React from 'react';
import ReactModal from 'react-modal';

export const styles = {
  button: {
    fontWeight: 'bold',
    top: '2px',
    right: '2px',
  },
  content: {
    backgroundColor: '#fff',
    width: '150px',
    height: '150px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)'
  },
  title: {
    color: '#ff0000'
  },
};

class Modal extends React.Component {
  state = {
    modalIsOpen: false
  };

  toggleModal = () => this.setState({modalIsOpen: !this.state.modalIsOpen });

  render() {
    return(
      <div>
        <ReactModal style={styles.content} contentLabel="An Error Has Occurred" isOpen={() => {this.modalIsOpen()}}>
          <span style={styles.button} onClick={this.toggleModal}>X</span>
          <h2 style={styles.title}>Something Went Wrong</h2>
          <p>Ooops, we seem to have run into an issue loading your map. 
            Please refresh or try again later.</p>
        </ReactModal>
      </div>
    )
  }
}

export default Modal;