import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:2000',
});


function EditBook() { // function
  // bookID hold if of the book user wants to edit -> setBookId 
  // book holds the original book fetched from our get request. 
  // editedBook holds book data after edited 


  const [bookId, setBookId] = useState(''); 
  // returns a array with two values. 
  //  bookID which is current state 
  // setBookId which is a function to update it 
  // '' is an initial state value, for our case its empty 




  const [book, setBook] = useState(null);
  // book holds the original book fetched from our get request, setBok function will update book

  const [editedBook, setEditedBook] = useState(null);
  // edited book holds data after being data, setEditedBook is function to 


// handleInputChange is an arrow function that is CALLED when a user types into the input field for the book ID. only used when user is inputting the ID of the book they want to update
// this is called when there is a change made to one of the text fields (when)
// naming convention used when user wants to name the function that handles input changes 
  const handleInputChange = (event) => { //
    setBookId(event.target.value);
  };


/*
arrow function, is called when user CLICKS the 'Get Book'
it firsts checks if bookID is a validID , if not shows an alert 
when id is valid, it makes a get request to api endpoint to fetch a book by ID/ when response is received it upates both book and editedBook with fecthed data 

When user clicks "Get book" after an id has been inserted, this function is called. 
*/
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
/*
Handle changes in editable fields 
Will take the field name and value as parameters and updates the editedBook state by creating a new object with the updated field  contents */
// that takes two paramters field which is a title and value which is the new title admoin wantrs to update with
// setEdited book fucntion updates the state of the editedBook. takes a callback function that recieves state as 'prevBook' 
// field is the filed that we want to update for wxample the title, author etc
// value is the new value that we want to use. the name of the new book or author 

const handleFieldChange = (field, value) => {
  // Clone the previous book state
  const updatedBook = { ...editedBook };

  // Update the specified field with the new value
  updatedBook[field] = value;

  // Set the updated book state
  setEditedBook(updatedBook);
};
  /* 
  Called when the user CLICKS on the 'Edit Book' button. 
  Puts a PUT request to api endpoint with the new updatedBook data.
  if request is succesful, logs message and updates book with response user typed in

  */
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




  /*
  JSX rendering portion */
  return (
    <div>
      <h1>Edit Book</h1>
      <label>
        Enter the ID of the book you'd like to edit:
        <input
          type="number"
          value={bookId}
          onChange={handleInputChange} // event handler that can specify what function should be called  when the value of the input field changes. If we were to omit, the input field is still visible, but we wouldbt be able to type into it or see tect appear 
          // in this instance it will call the handleInputChange function
        />
      </label>
      <button type="button" onClick={handleGetBook}>Get Book</button>
      
      {book && editedBook && ( // checks if they are not null 
        <div>
          <p>Book ID: {book.id}</p>
          <label>
            Title:
            <input
              type="text" // type of text 
              value={editedBook.title} // the value entered will be the value of the book we want to edit (new title for example)
              onChange={(e) => handleFieldChange('title', e.target.value)} // eventHandler
              // onChange sets up eventHandler(when text field changes)
              // e is the object passed in to the event handler as a parameter. e has details about the event happening like what element triggered it and what type of event it is. 
              // you can access event object to get specifiv information about the even, 
              // e.target : refers to the element that triggered that event(input field in our case)
              // e.target.value : gives the value of that input field "title" author
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
          <label>
            Publisher
            <input
            type = "text"
            value = {editedBook.publisher}
            onChange = {(e) => handleFieldChange('publisher', e.target.value)}
            />
          </label>
          <label>
            isbn
            <input
            type = "text"
            value = {editedBook.isbn}
            onChange = {(e) => handleFieldChange('isbn', e.target.value)}
            />
          </label>
          <button type="button" onClick={handleUpdateBook}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default EditBook;
