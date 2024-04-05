import React, { useState, useRef  } from 'react';
import { getCookie } from '../utils';

const UploadForm = ({ goToImageList }) => {
  const [name, setName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const csrfToken = getCookie('csrftoken');

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name) {
      alert('Please enter a name');
      return;
    }

    if (!selectedFile) {
      alert('Please choose a file');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', selectedFile);

    try {
      const response = await fetch('http://localhost:8000/upload/', {
        method: 'POST',
        body: formData,
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
      // Optionally handle success response
      goToImageList();
    } catch (error) {
      console.error('Error uploading image:', error.message);
    }
  };

  return (
    <div className='container text-center'>
      <h2 className='text-center mt-5'>Upload New Poster</h2>
      <form className='mt-5' onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="name" value={name} onChange={handleNameChange} placeholder="Enter a name" />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
          accept="image/*"
        />
        <button className='btn btn-outline-warning m-1' onClick={handleUploadClick}>Choose File</button>
        {selectedFile && <span>{selectedFile.name}</span>}
        <div className="mt-3">
          <button className='btn btn-warning' type="submit">Upload</button>
        </div>
      </form>
      <button className='btn btn-warning mt-5' onClick={goToImageList}>Back to List</button>
    </div>
  );
};

export default UploadForm;
