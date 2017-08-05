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
        {books.map((book) => {
          const { id = 0, imageLinks = {}, title = 'Unknown', authors = []} = book;
          const { thumbnail='https://www.google.com/images/errors/robot.png' } = imageLinks;
          const [ bookAuthors='Unknown' ] = authors;

          return <Book key={id} bookCover={thumbnail} bookTitle={title} bookAuthors={bookAuthors}/>
        })}
      </ol>
    )
  }
}

export default BookGrid;