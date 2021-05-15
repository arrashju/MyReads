import React, { Component } from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import BookShelf from './BookShelf';
import SearchButton from './SearchButton';

const SearchResults = ({ onSelection, books, shelves }) => {
    return (
      <div>
         {
      		Object.keys(shelves).map((shelf, index) => {
      		  return (
                <BookShelf
                  onSelection={onSelection}
                  books={books.filter(book => {
                  	return (
                    	shelves[shelf].includes(book.id)
                    )
                  })}
				  shelf={shelf}
				  key={index}
                />
			 )
		   })
		}
		<SearchButton />
      </div>
   )
}

export default SearchResults
