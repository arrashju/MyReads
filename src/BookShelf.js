import React from 'react';
import './App.css';
import Book from './Book';

const BookShelf = ({ books, shelf, onSelection }) => {    
    return (
          <div className="bookshelf">
            <h2 className="bookshelf-title">{shelf.title}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                  {
                    books.map(book => {
                      	return (
                            <Book onSelection={onSelection} book={book} key={book.id} />
                      	)
                    })
                  }
              </ol>
            </div>
          </div>
	)
}

export default BookShelf;