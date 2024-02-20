import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import './styles.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [initialPageLoad, setInitialPageLoad] = useState(true);

  const handleSearchSubmit = useCallback((newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setTotalHits(null);
    setInitialPageLoad(false);
  }, []);

  const handleLoadMore = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  const handleImageClick = useCallback((largeImageURL) => {
    setSelectedImage(largeImageURL);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const fetchImages = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=42244155-8c54490789349f44f8e631503&image_type=photo&orientation=horizontal&per_page=12`
      );
      const { hits, totalHits } = response.data;
      setTotalHits(totalHits);
      setImages((prevImages) => (page === 1 ? hits : [...prevImages, ...hits]));
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    if (!initialPageLoad) {
      fetchImages();
    }
  }, [initialPageLoad, fetchImages]);

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      
      {isLoading && <Loader />}

      {images.length > 0 && images.length < totalHits && !isLoading && (
        <Button onLoadMore={handleLoadMore} />
      )}

      {selectedImage && <Modal largeImageURL={selectedImage} onClose={handleCloseModal} />}
    </div>
  );
};

export default App;
