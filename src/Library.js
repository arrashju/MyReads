import React, { Component } from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import BookShelf from './BookShelf';
import SearchButton from './SearchButton';
import * as BooksAPI from './BooksAPI';

class Library extends Component {
  	constructor(props) {
    	super(props);
      
      	this.state = {
        	books: []
        }
      
      	this.handleShelfChange = this.handleShelfChange.bind(this);
    }
  
  	componentDidMount() {
      	const { books } = this.props
        
    	this.setState({ books })
    }
  
   	handleShelfChange = (book, shelf) => {
      	const { books } = this.state;
        
    	this.setState({ 
            books: books.map(b => {
              if (b.id === book.id) b.shelf = shelf

              return b
            })
        })
      
    	BooksAPI.update(book, shelf)
    }
  	
    render() {
      	const { shelves } = this.props
        const { books } = this.state
        const { handleShelfChange } = this
      
		return (
          <div>
             {
                shelves.map(shelf => {
                  return (
                    <BookShelf
                      onSelection={handleShelfChange}
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
}

export default Library
