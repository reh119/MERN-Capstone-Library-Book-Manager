import React, { useState } from 'react'
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:2000'
});





// User wants to add books 
// http://localhost:8000/books/Add
// Will have field all details of a book available
// User will type new book details
// 'Add Book'
// book will be added into the database. 
function BooksAdd() {



    const [addedBook, setAddedBook] = useState({
        title: '', 
        author: '', 
        publisher: '', 
        isbn: '', 
        available: '', 
        who: '',
        due: ''

    });
  
    // added book holds data after being insert into text field, setAddedBook is function to add the new book





    const handleAddBook = () => {
        // Make a PUT request to update book information
        api.post(`/books/Add`, addedBook)
            .then(response => {
                console.log('Book Added successfully:', response.data);
                // Optionally, update the book state with the updated data
                setAddedBook(response.data);
            })
            .catch(error => {
                console.error('Error updating book:', error);
            });
    };


    const handleFieldChange = (field, value) => {
        // Clone the previous book state
        const newBook = { ...addedBook };

        // Update the specified field with the new value
        newBook[field] = value;

        // Set the updated book state
        setAddedBook(newBook);
    };





    return (
        <div>
            <h1>Add Book: </h1>
            <label>
                Title:
                <input
                    type="text"
                    value = {addedBook.title}
                    onChange = {(e) => handleFieldChange('title',e.target.value)} // event handler to 
                />
            </label>
            <label>
                author:
                <input
                    type="text"
                />
            </label>
            <label>
                publisher:
                <input
                    type="text"
                />
            </label>
            <label>
                isbn:
                <input
                    type="text"
                />
            </label>
            <label>
                Available:
                <input
                    type="text"
                />
            </label>
            <label>
                Who:
                <input
                    type="text"
                />
            </label>
            <label>
                due:
                <input
                    type="text"
                />
            </label>

            <button type="button" onClick={handleAddBook}>Edit</button>


        </div>
    );
}



export default BooksAdd;