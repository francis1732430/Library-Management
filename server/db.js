const Users = require("./mockData/users.json");
const Roles = require("./mockData/roles.json");
const Books = require("./mockData/books.json");
const BookBorrow = require("./mockData/book-borrow.json");

module.exports =  () => ({
    Users,
    Roles,
    Books,
    BookBorrow
});