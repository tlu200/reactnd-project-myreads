import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookshelfChanger extends Component {
  static propTypes = {
    currentStatus: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  render() {
    const { currentStatus, onChange} = this.props;
    return (
      <div className="book-shelf-changer">
        <select value={currentStatus} onChange={(e) => onChange(e.target.value)}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default BookshelfChanger;