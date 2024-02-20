import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class Modal extends Component {
  handleClose = () => {
    this.props.onClose();
  };

  render() {
    return (
      <div className="Overlay" onClick={this.handleClose}>
        <div className="Modal">
          <img src={this.props.largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
