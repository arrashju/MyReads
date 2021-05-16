import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';
import './App.css';

class BookSearch extends Component {
  	constructor(props) {
    	super(props);
      
      	this.state = {
          results: [],
          searchText: ''
        }
      
      	this.handleSearchChange = this.handleSearchChange.bind(this);
    }
  
  	handleSearchChange = event => {
      event.preventDefault();

      const { books } = this.props

      this.setState({ searchText: event.target.value })

      if (event.target.value !== '') {
        BooksAPI.search(event.target.value, 20)
          .then(results => {

              console.log(results)
              this.setState({
                  results:  results.map(result => 
                              {
                                  result.shelf = "none"
              
                                  books.forEach(book => {
                                      if (book.id === result.id) result.shelf = book.shelf
                                  })
                                
                                  return result
                              }
                  )
              });
          })
          .catch(err => {
              console.log(err)

              this.setState({
                results: []
              });
          });
        }
    }

    handleShelfChange = (result, shelf) => {
      const { results } = this.state
      
      result.shelf = shelf

      this.setState({ results:
          results.map(r => {
              if (r.id === result.id) r.shelf = result.shelf
              return r
          })
      })

      const { onSelection } = this.props

      onSelection(result, shelf)
    }

	  render() {
      const { handleSearchChange, handleShelfChange } = this;
      const { results, searchText } = this.state;

    	return (
          	<div className="search-books">
              <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                  {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
                  <input type="text" onChange={handleSearchChange} value={searchText} placeholder="Search by title or author"/>
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
					          {
                    	results.map((result, index) => {
                      		return (
                      			<li><Book onSelection={handleShelfChange} book={result} key={index}/></li>
                      		)
                    	})
                    }
				        </ol>
              </div>
            </div>
        )
    }
}

BookSearch.PropTypes = {
	searchText: PropTypes.string,
  	results: PropTypes.array
}

export default BookSearch;