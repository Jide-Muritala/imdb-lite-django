// App.js
import React, { useState } from 'react';
import Header from './components/Header';
import ImageList from './components/ImageList';
import UploadForm from './components/UploadForm';
import Footer from './components/Footer';
import ImageDetail from './components/ImageDetail';

function App() {
  // State to track the current page
  const [currentPage, setCurrentPage] = useState('imageList');
  const [imageId, setImageId] = useState(null);

  // Function to switch to the upload form page
  const goToUploadForm = () => {
    setCurrentPage('uploadForm');
  };

  // Function to switch to the image detail page
  const goToImageDetail = (id) => {
    setImageId(id);
    setCurrentPage('imageDetail');
  };

  // Function to switch back to the image list page
  const goToImageList = () => {
    setCurrentPage('imageList');
  };

  return (
    <div className="">
      <Header />
      {/* Render different components based on the current page */}
      {currentPage === 'imageList' && (
        <ImageList goToUploadForm={goToUploadForm} goToImageDetail={goToImageDetail} />
      )}
      {currentPage === 'uploadForm' && (
        <UploadForm goToImageList={goToImageList} />
      )}
      {currentPage === 'imageDetail' && (
        <ImageDetail imageID={imageId} goToImageList={goToImageList} />
      )}
      <Footer />
    </div>
  );
}

export default App;
