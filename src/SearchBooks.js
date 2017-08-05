import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookGrid from './BookGrid';

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    query: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func.isRequired
  };

  render() {
    const { query, books, onChange, onKeyPress } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text"
                   placeholder="Search by title or author"
                   value={query}
                   onKeyPress={onKeyPress}
                   onChange={onChange}
            />
          </div>
        </div>
        {books.length > 0 && (
          <div className="search-books-results">
            <BookGrid books={books} />
          </div>
        )}
      </div>
    )
  }
}

export default SearchBooks