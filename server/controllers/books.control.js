const books = require("../mockData/books.json");
let bookBorrows = require("../mockData/book-borrow.json");
let bookFees = require("../mockData/book-fees.json");
let users = require("../mockData/users.json");
const util = require('../helpers/util');

bookFees = bookFees.sort((a, b) => a.due_date - b.due_date);

const getAllbooks = (req, res) => {

    const author = req.query.author;
    const category = req.query.category;
    const bookTitle = req.query.book_title;
    const userId = parseInt(req.query.userId, 10);

    let cacheIds = {};
    let results = [];
    let booksResults = books;
    const bookBorrowResults = bookBorrows.filter((bookBorrow) => {
        if (userId) {
            if (bookBorrow.user_id === userId && bookBorrow.is_active === 1) {
                return true;
            } else {
                return false;
            }
        } else if(bookBorrow.is_active === 1) {
            return true;
        }
    }
    );
    const bookResults = [];
    bookBorrowResults.forEach((bookBorrow) => {
        const bookDetails = booksResults.find((book) => book.id === bookBorrow.book_id);
        if (bookDetails) {
            const bookObj = {...bookDetails};
            bookObj['booksBorrows'] = bookBorrow;
            bookResults.push(bookObj);
        }
    });
    if (userId) {
        booksResults = bookResults;
    } else {
        const availableBooks = booksResults.filter((book) => book.book_status === 'AVAILABLE');
        booksResults = [...availableBooks, ...bookResults];
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
            if (bookDetails && bookBorrow.is_active === 1) {
                const bookObj = {...bookDetails};
                bookObj['booksBorrows'] = bookBorrow;
                bookResults.push(bookObj);
            }
        });
        booksResults = bookResults;
    }
    if (bookStatus === 'OVERDUE') {
        const bookResults = [];
        bookBorrows.forEach((bookBorrow) => {
            const bookDetails = booksResults.find((book) => book.id === bookBorrow.book_id);
            if (bookDetails && bookBorrow.is_active === 1) {
                const diffDays = util.getDaysBetweenDates(bookBorrow.return_date, new Date().toISOString());
                const bookFeeDetails = 0 < diffDays && bookFees.find((bookFee) => diffDays <= bookFee.due_date);
                if (bookFeeDetails) {
                    bookBorrow['fee_charge'] = bookFeeDetails.fee_amount;
                }
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

const borrowBooks = (req, res) => {


    const userId = parseInt(req.params.userId, 10);
    const bookId = parseInt(req.params.bookId, 10);

    const userDetail = users.find((user) => user.id === userId);
    const bookDetails = books.find((book) => book.id === bookId);

    if (!userDetail || !bookDetails) {
        res.status(400).json({
            status: 400,
            message: "User or Book does not exist"
        });

        return;
    } else if (bookDetails.book_status !== 'AVAILABLE') {
        res.status(400).json({
            status: 400,
            message: "Books is not available to borrow"
        });

        return;
    }
    let count = 0;
    bookBorrows.findIndex((bookBorrow) => {
        count = (bookBorrow.user_id === userId
            && bookBorrow.is_active === 1
            && (bookBorrow.book_status === 'BORROWED' || bookBorrow.book_status === 'OVERDUE')) ? count + 1 : count;
        if (3 === count) {
            return true;
        }
    });

    count = count + 1;
    if (3 < count) {
        res.status(400).json({
            status: 400,
            message: "Maximum borrow count 3 is exceeded"
        });
    } else {
            bookDetails['book_status'] = "BORROWED";
            bookDetails['updatedAt'] = new Date().toISOString();

            bookBorrows.push({
                "id": bookBorrows.length + 1,
                "user_id": userId,
                "user_name": userDetail.user_name,
                "book_id": bookId,
                "book_name": bookDetails.book_title,
                "borrowed_date": new Date().toISOString(),
                "return_date": util.addDays(new Date().toISOString(), bookDetails.return_in_days),
                "fee_charge": "0",
                "book_status": "BORROWED",
                "createdAt": new Date().toISOString(),
                "updatedAt": new Date().toISOString(),
                "is_active": 1
            });

            res.json({
                message: "Books borrowed successfully",
                bookBorrows
            });
    }
}

const returnBooks = (req, res) => {

    const userId = parseInt(req.params.userId, 10);
    const bookId = parseInt(req.params.bookId, 10);

    const userDetail = users.find((user) => user.id === userId);
    const bookDetails = books.find((book) => book.id === bookId);

    if (!userDetail || !bookDetails) {
        res.status(400).json({
            status: 400,
            message: "User or Book does not exist"
        });

        return;
    } else if (bookDetails.book_status === 'AVAILABLE') {
        res.status(400).json({
            status: 400,
            message: "Books should not available state"
        });

        return;
    }

    bookDetails['book_status'] = "AVAILABLE";
    bookDetails['updatedAt'] = new Date().toISOString();

    bookBorrows = bookBorrows.map((bookBorrow) => {
        if (bookBorrow.user_id === userId && bookBorrow.book_id === bookId) {
            bookBorrow['is_active'] = 0;
        }

        return bookBorrow
    });

    const removeInActiveBorrow = bookBorrows.filter(item => item.is_active === 1);

    res.json({
        message: "Books returned successfully",
        bookBorrows: removeInActiveBorrow
    });
}

const getBookHistory = (req, res) => {
    const author = req.query.author;
    const category = req.query.category;
    const bookTitle = req.query.book_title;

    let cacheIds = {};
    let results = [];
    let booksResults = books;

    const bookResults = [];
    bookBorrows.forEach((bookBorrow) => {
        const bookDetails = booksResults.find((book) => book.id === bookBorrow.book_id);
        if (bookDetails) {
            const diffDays = util.getDaysBetweenDates(bookBorrow.return_date, new Date().toISOString());
            const bookFeeDetails = 0 < diffDays && bookFees.find((bookFee) => diffDays <= bookFee.due_date);
            if (bookFeeDetails) {
                bookBorrow['fee_charge'] = bookFeeDetails.fee_amount;
            }
            const bookObj = {...bookDetails};
            bookObj['booksBorrows'] = bookBorrow;
            bookResults.push(bookObj);
        }
    });
    booksResults = bookResults;
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
}

module.exports = {
    getAllbooks,
    getAllBorrowedBooks,
    borrowBooks,
    returnBooks,
    getBookHistory
}