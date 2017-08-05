import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Bookshelf from './Bookshelf';

class ListBooks extends  Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  };

  render() {
    const currentlyReading = [];
    const wantToRead = [];
    const read = [];
    for(const book of this.props.books) {
      switch(book.shelf) {
        case 'currentlyReading':
          currentlyReading.push(book);
          break;
        case 'watnToRead':
          wantToRead.push(book);
          break;
        case 'read':
          read.push(book);
          break;
        default:
      }
    }

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {currentlyReading.length > 0 && (<Bookshelf bookshelfTitle="Currently Reading" books={currentlyReading}/>)}
            {wantToRead.length > 0 && (<Bookshelf bookshelfTitle="Want to Read" books={wantToRead}/>)}
            {read.length > 0 && (<Bookshelf bookshelfTitle="Read" books={read}/>)}
          </div>
        </div>
        <div className="open-search">
          <a onClick={() => {}}>Add a book</a>
        </div>
      </div>
    )
  }
}

export default ListBooks;