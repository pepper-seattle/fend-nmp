import React from 'react';
import Modal from '@material-ui/core/Modal';

import { withStyles } from '@material-ui/core/styles';

export const styles = theme => ({
  button: {
    float: 'right',
    fontSize: '16px',
    fontWeight: 'bold',
    top: '2px',
  },
  paper: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: '250px',
    height: '175px',
    padding: theme.spacing.unit * 4,
    textAlign: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  title: {
    color: '#ff0000'
  },
});

class ErrorModal extends React.Component {
  state = {
    modalIsOpen: false,
  };

  handleClose = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const {classes} = this.props;
    return(
      <div>
        <Modal 
          aria-labelledby="error-modal" 
          open={this.state.modalIsOpen}
          onClose={this.handleClose}
        >
          <div className={classes.paper}>
            <button className={classes.button} onClick={() => {this.handleClose()}}>X</button>
            <h2 className={classes.title}>Something Went Wrong</h2>
            <p>Ooops, we seem to have run into an issue loading your map. 
              Please refresh or try again later.</p>
          </div>
        </Modal>
      </div>
    )
  }
}

export default withStyles(styles)(ErrorModal);