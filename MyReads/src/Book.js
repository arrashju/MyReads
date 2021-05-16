import React from 'react';
import BookUpdate from './BookUpdate';
import './App.css'

const Book = ({ onSelection, book }) => {
	const { title, authors, imageLinks } = book;
	const { smallThumbnail } = imageLinks || { smallThumbnail: '' };
      	
	return (
		<div className="book">
			<div className="book-top">
				<div
					className="book-cover"
					style={{ width: 128, height: 193, backgroundImage: `url(${smallThumbnail})`, backgroundRepeat: 'no-repeat', backgroundColor: '#ddd'}}></div>
				<BookUpdate onSelection={onSelection} book={book}/>
			</div>
			<div className="book-title">{title}</div>
			<div className="book-authors">{authors}</div>
			
		</div>
	)
}

export default Book;