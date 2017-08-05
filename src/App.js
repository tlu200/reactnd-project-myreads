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

  updateQuery = (query) => {
    this.setState({ query })
  };

  updateSearchResults(response) {
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
  }

  searchBooks(query) {
    BooksAPI.search(query, 20).then((response) => {
      this.updateSearchResults(response);
    });
  }

  handleOnBookChange(change) {
    console.log(change);
  }

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
              onChange={(event) => { this.updateQuery(event.target.value) }}
              onKeyPress={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                this.searchBooks(this.state.query);
              }}}
              onBookChange={this.handleOnBookChange}
            />
          )}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
