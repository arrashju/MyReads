import React, { Component } from 'react';
import BookUpdate from './BookUpdate';
import './App.css'

class Book extends Component {
 
	render() {
      	const { book, onSelection } = this.props;
        const { title, author, imageLinks } = book;
		const { smallThumbnail } = imageLinks;
      	
    	return (
          	<div className="book">
            	<div className="book-top">
                	<div className="book-cover" style={{ width: 128, height: 193, background: `#ddd ${smallThumbnail ? `url(${smallThumbnail})` : ''} no-repeat` }}></div>
					<BookUpdate onSelection={onSelection} book={book} shelf={book.shelf} />
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{author}</div>
				
		  	</div>
        )
    }
}

export default Book;