var jsonServer  = require('json-server');
const booksController = require("../controllers/books.control");

const router = jsonServer.create();

router.get('/getAllBooks', booksController.getAllbooks);
router.get('/getAllBorrowedBooks', booksController.getAllBorrowedBooks);
router.post('/book-borrow/:userId/:bookId', booksController.borrowBooks);
router.post('/return-book/:userId/:bookId', booksController.returnBooks);
router.get('/getBookHistory', booksController.getBookHistory);

module.exports = router;