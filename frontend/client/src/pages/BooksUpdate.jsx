import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:2000',
});
function EditBook() {
  const [bookId, setBookId] = useState('');
  const [book, setBook] = useState(null);
  const [editedBook, setEditedBook] = useState(null);

  const handleInputChange = (event) => {
    setBookId(event.target.value);
  };

  const handleGetBook = () => {
    if (isNaN(bookId) || bookId <= 0) {
      alert('Please enter a valid book ID.');
    } else {
      // Make a GET request to fetch book information by ID
      api.get(`/books/${bookId}`)
        .then(response => {
          setBook(response.data);
          setEditedBook(response.data); // Initialize the editedBook state
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const handleFieldChange = (field, value) => {
    setEditedBook(prevBook => ({
      ...prevBook,
      [field]: value,
    }));
  };

  const handleUpdateBook = () => {
    // Make a PUT request to update book information
    api.put(`/books/${bookId}`, editedBook)
      .then(response => {
        console.log('Book updated successfully:', response.data);
        // Optionally, update the book state with the updated data
        setBook(response.data);
      })
      .catch(error => {
        console.error('Error updating book:', error);
      });
  };

  return (
    <div>
      <h1>Edit Book</h1>
      <label>
        Enter the ID of the book you'd like to edit:
        <input
          type="number"
          value={bookId}
          onChange={handleInputChange}
        />
      </label>
      <button type="button" onClick={handleGetBook}>Get Book</button>
      
      {book && editedBook && (
        <div>
          <p>Book ID: {book.id}</p>
          <label>
            Title:
            <input
              type="text"
              value={editedBook.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
            />
          </label>
          <label>
            Author:
            <input
              type="text"
              value={editedBook.author}
              onChange={(e) => handleFieldChange('author', e.target.value)}
            />
          </label>
          {/* ... Other editable fields */}
          <button type="button" onClick={handleUpdateBook}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default EditBook;
