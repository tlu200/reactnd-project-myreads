import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookGrid from './BookGrid';

class Bookshelf extends Component {
  static propTypes = {
    bookshelfTitle: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onBookChange: PropTypes.func.isRequired
  };

  render() {
    const { bookshelfTitle, books, onBookChange} = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{bookshelfTitle}</h2>
        <div className="bookshelf-books">
          <BookGrid books={books} onBookChange={onBookChange}/>
        </div>
      </div>
    )
  }
}

export default Bookshelf;