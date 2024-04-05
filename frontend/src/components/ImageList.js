import React, { useState, useEffect } from 'react';

const ImageList = ({ goToUploadForm, goToImageDetail }) => {
  // State to store the list of images
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Function to fetch images from the Django backend
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:8000/', {
          headers: {
            Accept: 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        console.log(data);
        setImages(data);
      } catch (error) {
        console.error('Error fetching images:', error.message);
      }
    };

    // Call the fetchImages function
    fetchImages();
  }, []);

  return (
    <div className='container text-center'>
      <h2 className='text-center mt-5 mb-3'>Movie List</h2>
      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Movie Name</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {images && images.length > 0 && images.map((image) => (
            <tr key={image.id}>
              <td>{image.id}</td>
              <td>{image.name}</td>
              <td><button onClick={() => {
                  console.log(image.id);
                  goToImageDetail(image.id);
                }}>
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Button to navigate to the upload image page */}
      <button className='btn btn-warning mt-5' onClick={goToUploadForm}>Upload New Poster</button>
    </div>
  );
};

export default ImageList;
