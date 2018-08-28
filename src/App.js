import React from 'react';
import BookList from './components/bookList/BookList';
// import * as BooksAPI from './BooksAPI'
import './App.css'
import * as BooksAPI from "./BooksAPI";
import {Link, Route} from 'react-router-dom';

class BooksApp extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        showSearchPage: false,
        modes: ['Read', 'Currently Reading', 'Want To Read'],
        searchedBooks: []
    }

    componentDidMount() {
        this.getAllBooks();
    }

    getAllBooks() {
        BooksAPI.getAll()
            .then((books) => {
                this.organiseShelf(books);
            })
    }

    organiseShelf(books) {
        this.setState(() => ({
            books: books,
            read: books.filter(book => book.shelf == 'read'),
            currently_reading: books.filter(book => book.shelf == 'currentlyReading'),
            want_to_read: books.filter(book => book.shelf == 'wantToRead')
        }))
    }

    updateShelf = (book, event) => {
        let shelf = event.target.value;
        BooksAPI.update(book, shelf)
            .then((response) => {
                this.getAllBooks();
                this.updateSearchedListState(book, shelf);
            });
    }

    searchBooks = (event) => {
        let searchTerm = event.target.value;
        BooksAPI.search(searchTerm)
            .then((response) => {
              if(response && !response['error']) {
                this.mapSearchedBookstate(response);
              } else {
                  this.setState(() => ({
                      searchedBooks: []
                  }))}
            });
    }

    mapSearchedBookstate = (books)  => {
        let bookShelfCollection = this.state.books;
        books && books.forEach(function(value,index) {
            let book = bookShelfCollection.filter( book => book.id === value.id );
            if(book.length > 0) {
                value['shelf'] = book[0].shelf;
            } else {
              value['shelf'] = 'none';
            }
        })
        this.setState(() => ({
            searchedBooks: books
        }))
      console.log(this.state.searchedBooks)
    }

    updateSearchedListState = (updatedBook, shelf) => {
        if(this.state.searchedBooks.filter( book => book.id === updatedBook.id )[0]) {
            this.state.searchedBooks.filter( book => book.id === updatedBook.id )[0]['shelf'] = shelf;
        }
    }

    render() {
        return (
            <div className="app">
                <Route path='/search' render={() => (
                    <div className="search-books">
                        <div className="search-books-bar">
                            <Link to = '/' className="close-search"
                                  onClick={() => this.setState({searchedBooks: []})}>Close</Link>
                            <div className="search-books-input-wrapper">
                                <input type="text" placeholder="Search by title or author"
                                       onKeyUp={(event) => this.searchBooks(event)}/>
                            </div>
                        </div>
                        <div className="search-books-results">
                          <div className="bookshelf">
                            <div className="bookshelf-books">
                              <ol className="books-grid">
                                {this.state.searchedBooks && this.state.searchedBooks.map((book) => (
                                  <BookList book={book} updateShelf={this.updateShelf}/>
                                ))}
                              </ol>
                            </div>
                          </div>
                        </div>
                    </div>
                )}/>
                <Route exact path='/' render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                {this.state.modes.map((mode) => (
                                    <div className="bookshelf">
                                        <h2 className="bookshelf-title">{mode}</h2>
                                        <div className="bookshelf-books">
                                            <ol className="books-grid">
                                                {this.state[mode.replace(/ /g, "_").toLocaleLowerCase()] && this.state[mode.replace(/ /g, "_").toLocaleLowerCase()].map((book) => (
                                                  <BookList book={book} updateShelf={this.updateShelf}/>

                                                ))}
                                            </ol>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to='/search'>Add a book</Link>
                        </div>
                    </div>
                )}/>

            </div>
        )
    }
}

export default BooksApp
