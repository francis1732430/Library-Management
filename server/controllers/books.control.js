let books = require("../mockData/books.json");
const bookBorrows = require("../mockData/book-borrow.json");

const getAllbooks = (req, res) => {

    const author = req.query.author;
    const category = req.query.category;
    const bookTitle = req.query.book_title;
    const userId = parseInt(req.query.userId, 10);

    let cacheIds = {};
    let results = [];
    let booksResults = books;
    if (!!userId) {
        const bookBorrowResults = bookBorrows.filter((bookBorrow) => bookBorrow.user_id === userId);
        const bookResults = [];
        bookBorrowResults.forEach((bookBorrow) => {
            const bookDetails = booksResults.find((book) => book.id === bookBorrow.book_id);
            if (bookDetails) {
                const bookObj = {...bookDetails};
                bookObj['booksBorrows'] = bookBorrow;
                bookResults.push(bookObj);
            }
        });
        booksResults = bookResults;
    }
    if (author || category || bookTitle) {
        results = booksResults.filter((book) => {
            if (new RegExp(bookTitle, 'i').test(book.book_title)
            || new RegExp(author, 'i').test(book.author)
            || new RegExp(category).test(book.category)) {
                if (!cacheIds[book.id]) {
                    cacheIds[book.id] = book.id
                    return true;
                }
            }
            return false;
        });
    } else {
        results = booksResults;
    }
    res.json(results);
};

const getAllBorrowedBooks = (req, res) => {

    const author = req.query.author;
    const category = req.query.category;
    const bookTitle = req.query.book_title;
    const bookStatus = req.query.bookStatus;

    let cacheIds = {};
    let results = [];
    let booksResults = books;

    if (bookStatus === 'BORROWED') {
        const bookResults = [];
        bookBorrows.forEach((bookBorrow) => {
            const bookDetails = booksResults.find((book) => book.id === bookBorrow.book_id);
            if (bookDetails) {
                const bookObj = {...bookDetails};
                bookObj['booksBorrows'] = bookBorrow;
                bookResults.push(bookObj);
            }
        });
        booksResults = bookResults;
    }
    if (author || category || bookTitle) {
        results = booksResults.filter((book) => {
            if (new RegExp(bookTitle, 'i').test(book.book_title)
            || new RegExp(author, 'i').test(book.author)
            || new RegExp(category).test(book.category)) {
                if (!cacheIds[book.id] && bookStatus === book.book_status) {
                    cacheIds[book.id] = book.id
                    return true;
                }
            }
            return false;
        });
    } else {
        results = booksResults.filter(book => book.book_status === bookStatus);
    }
    res.json(results);
};

module.exports = {
    getAllbooks,
    getAllBorrowedBooks
}