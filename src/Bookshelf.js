import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class Bookshelf extends Component {
  static propTypes = {
    bookshelfTitle: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired
  };

  render() {
    const { bookshelfTitle, books } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{bookshelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <Book key={book.id} bookCover={book.imageLinks.thumbnail} bookTitle={book.title} bookAuthors={book.authors[0]}/>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf;