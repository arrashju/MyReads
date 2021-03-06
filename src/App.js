import './App.css';
import Library from './Library';
import BookSearch from './BookSearch';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

class BooksApp extends Component {

  /**
   * TODO: Instead of using this state variable to keep track of which page
   * we're on, use the URL in the browser's address bar. This will ensure that
   * users can use the browser's back and forward buttons to navigate between
   * pages, as well as provide a good URL they can bookmark and share.
   */

  constructor(props) {
    super(props);
    
      this.state = {
          books: []
      }
    
      this.handleShelfChange = this.handleShelfChange.bind(this)
  }

  componentDidMount() { //load all the books from the API once on page load / refresh
    BooksAPI.getAll()
      .then(books => this.setState({ books }) )
      .catch(err => console.log(err));
  }

  handleShelfChange = (book, shelf) => { //update books state after shelf change
    const { books } = this.state
    book.shelf = shelf

    if (shelf === 'none') {
      this.setState({ books: books.filter(b => b.id !== book.id) })
    } else {
      const ids = books.map(b => b.id)

      if (!ids.includes(book.id)) {
        this.setState({ books: books.concat(book) })
      } else (
        this.setState({ books:
            books.map(b => {
              if (b.id === book.id) b.shelf = book.shelf
              return b
            })
        })
      )
    }

    
    BooksAPI.update(book, shelf)
  }
  
  render() {
    const { books } = this.state;
    const { handleShelfChange } = this

    //switch page view between Library and BookSearch components

    return (
      	<div className="app">
      	  <Route exact path="/" component={() => <Library books={books} onSelection={handleShelfChange}/>} />
		      <Route path="/search">
            <BookSearch books={books} onSelection={handleShelfChange}/>
          </Route>
        </div>
    )
  }
}

BooksApp.PropTypes = {
	books: PropTypes.array,
  	shelves: PropTypes.arrayOf(PropTypes.object)
}

export default BooksApp
