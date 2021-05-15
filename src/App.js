import React, { Component } from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import Library from './Library';
import BookSearch from './BookSearch';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const shelves = [
	{ title: 'Currently Reading', key: 'currentlyReading' },
  	{ title: 'Want To Read', key: 'wantToRead' },
	{ title: 'Read', key: 'read' }
];

class BooksApp extends Component {

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll()
		.then(books => {
        	this.setState({books: books
                .map(book => {
                      if (!book.hasOwnProperty('id')) book.shelf = "none";
                      return book;
				})
        	});
        })
		.catch(err => console.log(err));
  }
  
  render() {
    const { books } = this.state;

    return (
      	<div className="app">
      	<Route exact path="/" component={() => <Library books={books} shelves={shelves} />} />
		<Route path="/search" component={() => <BookSearch books={books} shelves={shelves}/>} />
      </div>
    )
  }
}

BooksApp.PropTypes = {
	books: PropTypes.array,
  	shelves: PropTypes.arrayOf(PropTypes.object)
}

export default BooksApp
