import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: [],
    query: ''
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    })
  }

  /**
   * Update the query in state
   *
   * @param {string} query
   */
  updateQuery = (query) => {
    this.setState({ query })
  };

  /**
   * Set the searchResults in state with the response from the API.
   * It will set the searchResults to an empty array if there is an error in the response,
   * It will set the shelf to 'none' by default unless the book with the same id is already in the shelf
   *
   * @param {object} response
   */
  setSearchResults = (response) => {
    if(!response.error) {
      const searchResults = [];
      for(const book of response) {
        const bookAlreadyInList = this.state.books.find((b) => b.id === book.id);
        if(bookAlreadyInList) {
          searchResults.push(bookAlreadyInList);
        } else {
          book.shelf = 'none';
          searchResults.push(book);
        }
      }
      this.setState({ searchResults });
    } else {
      this.setState({ searchResults: [] });
    }
  };

  /**
   * Call the BooksAPI with the search query and call setSearchResults function to set the result
   * after get response from the API
   *
   * @param {string} query
   */
  searchBooks = (query) =>{
    BooksAPI.search(query, 20).then((response) => {
      this.setSearchResults(response);
    });
  };

  /**
   * Update the books list in the state based on the change and book, it will remove the book from the list
   * if the shelf is set to 'none', add the book to the list if there is no book with the same id in the list,
   * change the shelf if the book with the same id is already in the list
   *
   * @param {object} change - The change object with 'id' and 'shelf' key
   * @param {object} book - The book object before the change
   */
  updateBooksList = (change, book) => {
    let { books } = this.state;
    if (change.shelf === 'none') {
      books = books.filter((b) => b.id !== change.id);
    } else {
      const bookAlreadyInList = books.find((b) => b.id === change.id);
      if (bookAlreadyInList) {
        bookAlreadyInList.shelf = change.shelf;
      } else {
        book.shelf = change.shelf;
        books.push(book)
      }
    }
    this.setState({ books });
  };

  /**
   * Update the search result in state based on the change, the shelf value of the book with the id
   * in the list will be updated
   *
   * @param {object} change - The change object with 'id' and 'shelf' key
   */
  updateSearchResults = (change) => {
    let { searchResults } = this.state;
    const bookAlreadyInList = searchResults.find((b) => b.id === change.id);
    if (bookAlreadyInList) {
      bookAlreadyInList.shelf = change.shelf;
    }
    this.setState({ searchResults });
  };

  /**
   * Handle the event when search query changed,
   * it will get the query from the event and call updateQuery function
   *
   * @param event
   */
  handleOnSearchChangeEvent = (event) => {
    this.updateQuery(event.target.value);
  };

  /**
   * Handle the key press event on the search page,
   * it will call the searchBooks to search with the query when the user hit 'Enter' key
   *
   * @param event
   */
  handleOnSearchKeyPressEvent = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.searchBooks(this.state.query);
    }
  };

  /**
   * Call the API to update the book and update the books list and searchResults when success
   *
   * @param {object} change - The change object with 'id' and 'shelf' key
   * @param {object} book - The book object before the change
   */
  handleOnBookChange = (change, book) => {
    BooksAPI.update({ id: change.id}, change.shelf).then(() => {
      this.updateBooksList(change, book);
      this.updateSearchResults(change);
    });
  };

  render() {
    const { query, books, searchResults } = this.state;
    return (
      <BrowserRouter>
        <div className="app">
          <Route exact path="/" render={() => (
            <ListBooks books={books} onBookChange={this.handleOnBookChange}/>
          )}/>
          <Route path="/search" render={() => (
            <SearchBooks
              query={query}
              books={searchResults}
              onChange={this.handleOnSearchChangeEvent}
              onKeyPress={this.handleOnSearchKeyPressEvent}
              onBookChange={this.handleOnBookChange}
            />
          )}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
