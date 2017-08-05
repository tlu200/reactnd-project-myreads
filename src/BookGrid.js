import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sortBy from 'sort-by';
import Book from './Book'

class BookGrid extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onBookChange: PropTypes.func.isRequired
  };

  render() {
    const { books, onBookChange } = this.props;

    return (
      <ol className="books-grid">
        {books.sort(sortBy('title')).map((book, index) => {
          const { id = 0, imageLinks = {}, title = 'Unknown', authors = [], shelf = 'none'} = book;
          const { thumbnail='https://www.google.com/images/errors/robot.png' } = imageLinks;
          const [ bookAuthors='Unknown' ] = authors;

          return <Book
            key={index}
            bookCover={thumbnail}
            bookTitle={title}
            bookAuthors={bookAuthors}
            shelf={shelf}
            onChange={(change) => {
              change.id = id;
              onBookChange(change, book)
            }}
          />
        })}
      </ol>
    )
  }
}

export default BookGrid;