import React, { useState, useEffect, useCallback } from 'react';

const ImageDetail = ({ imageId, goToImageList }) => {
  // State to store the image details
  const [image, setImage] = useState(null);
  // State to store comments
  const [comments, setComments] = useState([]);

  // Function to fetch image details and comments for the specific image
  const fetchImageDetails = useCallback(async () => {
    try {
      console.log(imageId);
      const response = await fetch(`http://localhost:8000/image/${imageId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch image details');
      }
      const data = await response.json();
      setImage(data);
      // Fetch comments for the image
      fetchComments(data.id);
    } catch (error) {
      console.error('Error fetching image details:', error.message);
    }
  }, [imageId]);

  // Function to fetch comments for the specific image
  const fetchComments = async (imageId) => {
    try {
      const response = await fetch(`http://localhost:8000/image/${imageId}/comments`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error.message);
    }
  };

  useEffect(() => {
    // Call the fetchImageDetails function
    fetchImageDetails();
  }, [fetchImageDetails]);

  // Function to handle adding comments
  const addComment = async (comment) => {
    try {
      const response = await fetch(`http://localhost:8000/image/${imageId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment }),
      });
      if (!response.ok) {
        throw new Error('Failed to add comment');
      }
      // Fetch updated comments after adding a new comment
      fetchComments(imageId);
    } catch (error) {
      console.error('Error adding comment:', error.message);
    }
  };

  // Render the image details and comments
  return (
    <div className='container text-center'>
      <h2 className='text-center mt-5 mb-3'>Movie Details</h2>
      {/* Render image and title if available */}
      {image && (
        <div>
          <h3>{image.name}</h3>
          <img src={`http://localhost:8000${image.image}`} alt={image.name} />
        </div>
      )}
      {/* Comments section */}
      <h3>Comments/Reviews</h3>
      {/* Add review */}
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      <form onSubmit={(e) => { e.preventDefault(); addComment(e.target.comment.value); }}>
        <input type='text' name='comment' />
        <button type='submit'>Add Review</button>
      </form>
       {/* Button to navigate back to the image list page */}
       <button className='btn btn-secondary mt-5' onClick={goToImageList}>Back to Image List</button>
    </div>
  );
};

export default ImageDetail;
