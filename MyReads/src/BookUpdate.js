import React from 'react';
import './App.css';

const BookUpdate = ({ onSelection, book }) => {
  
  	const handleShelfChange = event => {
      	event.preventDefault();

        const shelf = event.target.value
      
      	onSelection(book, shelf)
    }

  	return (
      <div className="book-shelf-changer">
        <select onChange={handleShelfChange} value={book.shelf}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
}

export default BookUpdate;