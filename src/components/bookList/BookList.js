import React, { Component } from 'react';
import PropTypes from 'prop-types'


class BookList extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        updateShelf: PropTypes.func.isRequired,
    }

    render() {
        const { book, updateShelf, mode } = this.props
        return(
                         <li>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})`}}></div>
                                    <div className="book-shelf-changer">
                                        <select
                                            onChange={(event) => updateShelf(book, event)}>
                                            <option value="none" disabled>Move to...
                                            </option>
                                            <option style={{ display: book.shelf == "currentlyReading" ? 'block': 'none'}}
                                                    id={book.id} value="currentlyReading"
                                                    key={book.id + 'cuttentlyReadingSelected'}>
                                                <span> &radic;   </span>
                                                <span>Currently Reading</span>
                                            </option>
                                            <option style={{ display: book.shelf != "currentlyReading" ? 'block': 'none'}}
                                                    id={book.id} value="currentlyReading"
                                                    key={book.id + 'cuttentlyReading'}>
                                                Currently Reading
                                            </option>
                                            <option style={{ display: book.shelf == "wantToRead" ? 'block': 'none'}}
                                                    id={book.id} value="wantToRead"
                                                    key={book.id + 'wantToReadSelected'}>
                                                <span> &radic;   </span>
                                                <span>Want to Read</span>
                                            </option>
                                            <option style={{ display: book.shelf != "wantToRead" ? 'block': 'none'}}
                                                    id={book.id} value="wantToRead"
                                                    key={book.id + 'wantToRead'}>
                                                <span>Want to Read</span>
                                            </option>
                                            <option style={{ display: book.shelf == "read" ? 'block': 'none'}}
                                                    id={book.id} value="read"
                                                    key={book.id + 'readSelected'}>
                                                <span> &radic;   </span>
                                                <span>Read</span>
                                            </option>
                                            <option style={{ display: book.shelf != "read" ? 'block': 'none'}}
                                                    id={book.id} value="read"
                                                    key={book.id + 'read'}>
                                                <span>Read</span>
                                            </option>
                                          <option style={{ display: book.shelf == "none" ? 'block': 'none'}}
                                                  id={book.id} value="none"
                                                  key={book.id + 'noneSelected'}>
                                            <span> &radic;   </span>
                                            <span>None</span>
                                          </option>
                                          <option style={{ display: book.shelf != "none" ? 'block': 'none'}}
                                                  id={book.id} value="none"
                                                  key={book.id + 'none'}>
                                            <span>None</span>
                                          </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-title">{book.authors}</div>
                            </div>
                        </li>

        )
    }
}

export default BookList;