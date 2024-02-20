import React, { Component } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import './styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      images: [],
      page: 1,
      totalHits: null,
      isLoading: false,
      selectedImage: null,
    };
  }

  handleSearchSubmit = (newQuery) => {
    this.setState(
      {
        query: newQuery,
        page: 1,
        images: [],
        totalHits: null,
      },
      this.fetchImages
    );
  };

  handleLoadMore = () => {
    this.setState(
      (prevState) => ({
        page: prevState.page + 1,
      }),
      this.fetchImages
    );
  };

  handleImageClick = (largeImageURL) => {
    this.setState({
      selectedImage: largeImageURL,
    });
  };

  handleCloseModal = () => {
    this.setState({
      selectedImage: null,
    });
  };

  fetchImages = async () => {
    const { query, page } = this.state;
    this.setState({
      isLoading: true,
    });

    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=42244155-8c54490789349f44f8e631503&image_type=photo&orientation=horizontal&per_page=12`
      );

      const { hits, totalHits } = response.data;
      this.setState((prevState) => ({
        totalHits,
        images: page === 1 ? hits : [...prevState.images, ...hits],
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  render() {
    const { images, totalHits, isLoading, selectedImage } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchSubmit} />

        <ImageGallery images={images} onImageClick={this.handleImageClick} />

        {isLoading && <Loader />}

        {images.length > 0 && images.length < totalHits && !isLoading && (
  <Button onLoadMore={this.handleLoadMore} />
)}

        {selectedImage && <Modal largeImageURL={selectedImage} onClose={this.handleCloseModal} />}
      </div>
    );
  }
}

export default App;
