import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { NavBar } from '../components';
import { BooksList } from '../pages';

import 'bootstrap/dist/css/bootstrap.min.css';
import BooksUpdate from '../pages/BooksUpdate';
import { BooksAdd } from '../pages'; // Corrected import statement

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/books/list" element={<BooksList />} />
        <Route path="/books/update/:_id" element={<BooksUpdate />} />
        <Route path="/books/Add" element={<BooksAdd />} />
      </Routes>
    </Router>
  );
}

export default App;
