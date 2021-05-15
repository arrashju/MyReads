import React, { Component } from 'react';
import './App.css';
import * as BooksAPI from './BooksAPI';

class BookUpdate extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
      	shelf: ''
      }
      
      this.handleChange = this.handleChange.bind(this);
    }
  
  	componentDidMount() {
    	const { shelf } = this.props;
      
      	this.setState({ shelf })
    }
  
  	handleChange = event => {
      	event.preventDefault();
      
      	const { book, onSelection } = this.props
      	
      	this.setState({ shelf: event.target.value }, () => {
    		BooksAPI.update(book, this.state.shelf)
        })
      
      	onSelection(book, event.target.value)
    }

  	render() {
      const { handleChange } = this;
	  const { shelf } = this.state;
		
      return (
        <div className="book-shelf-changer">
          <select onChange={handleChange} value={shelf}>
            <option value="move" disabled>Move to...</option>
			<option value="currentlyReading">Currently Reading</option>
			<option value="wantToRead">Want to Read</option>
			<option value="read">Read</option>
			<option value="none">None</option>
          </select>
        </div>
      )
    }
}

export default BookUpdate;