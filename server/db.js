const Users = require("./mockData/users.json");
const Roles = require("./mockData/roles.json");
const Books = require("./mockData/books.json");
const BookBorrow = require("./mockData/book-borrow.json");
const BookFees = require("./mockData/book-fees.json");

module.exports =  () => ({
    Users,
    Roles,
    Books,
    BookBorrow,
    BookFees
});