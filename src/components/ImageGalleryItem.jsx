import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class ImageGalleryItem extends Component {
  handleClick = () => {
    this.props.onImageClick(this.props.image.largeImageURL);
  };

  render() {
    const { webformatURL, tags } = this.props.image;

    return (
      <li className="ImageGalleryItem" onClick={this.handleClick}>
        <img src={webformatURL} alt={tags} className="ImageGalleryItem-image" />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
