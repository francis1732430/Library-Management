var jsonServer  = require('json-server');
const booksController = require("../controllers/books.control");

const router = jsonServer.create();

router.get('/getAllBooks', booksController.getAllbooks);
router.get('/getAllBorrowedBooks', booksController.getAllBorrowedBooks);

module.exports = router;