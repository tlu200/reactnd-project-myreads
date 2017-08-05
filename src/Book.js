import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookshelfChanger from './BookshelfChanger'

class Book extends Component {
  static propTypes = {
    bookCover: PropTypes.string.isRequired,
    bookTitle: PropTypes.string.isRequired,
    bookAuthors: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  render() {
    const { bookCover, bookTitle, bookAuthors, shelf, onChange} = this.props;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${bookCover}")` }}></div>
            <BookshelfChanger
              currentStatus={shelf}
              onChange={(value) => {
                onChange({ shelf: value })
              }}
            />
          </div>
          <div className="book-title">{ bookTitle }</div>
          <div className="book-authors">{ bookAuthors }</div>
        </div>
      </li>
    );
  }
}

export default Book;