// import * as BooksAPI from './BooksAPI'
import React from 'react';
import './App.css';
import BookShelf from './BookShelf';
import SearchButton from './SearchButton';

const Library = ({books, onSelection}) => {

    const shelves = [
      { title: 'Currently Reading', key: 'currentlyReading' },
      { title: 'Want To Read', key: 'wantToRead' },
      { title: 'Read', key: 'read' }
    ]
    
		return (
        <div>
            {
              shelves.map(shelf => {
                  return (
                    <BookShelf
                      onSelection={onSelection}
                      books={Object.values(books).filter(book => {
                        return book.shelf === shelf.key;
                      })}
                      shelf={shelf}
                      key={shelf.key}
                    />
                  )
              })
          }
          <SearchButton />
        </div>
		)
}

export default Library
