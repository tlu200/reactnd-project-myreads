import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book'

class BookGrid extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  };

  render() {
    const { books } = this.props;

    return (
      <ol className="books-grid">
        {books.map((book) => (
          <Book key={book.id} bookCover={book.imageLinks.thumbnail} bookTitle={book.title} bookAuthors={book.authors[0]}/>
        ))}
      </ol>
    )
  }
}

export default BookGrid;