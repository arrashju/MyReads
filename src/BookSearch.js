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
        	searchText: '',
          	results: []
        }
      
      	this.handleChange = this.handleChange.bind(this);
    }
  
  	handleChange = event => {
      	event.preventDefault();
      
      	const { searchText } = this.state;
      	const { books } = this.props
      
    	this.setState({ searchText: event.target.value }, () => {
        		BooksAPI.search(searchText.trim())
                    .then(results => {
                        this.setState({
                          results: 	results.map(result => {
                            			result.shelf = "none"
                
                                        books.forEach(book => {
                                            if (book.id === result.id) {
                                              result.shelf = book.shelf
                                            }
                                        })
                            			
                            			return result
                                  	})
                        });
                    })
                    .catch(err => {
                  		console.log(err)
                	});
		})
    }

	render() {
      	const { handleChange } = this;
		const { onSelection } = this.props;
		const { results } = this.state;

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
                  <input type="text" onChange={handleChange} placeholder="Search by title or author"/>
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
					{
                    	results.map(result => {
                      		return (
                      			<li><Book onSelection={onSelection} book={result} key={result.id}/></li>
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