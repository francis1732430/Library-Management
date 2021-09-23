var jsonServer  = require('json-server');
const userController = require("../controllers/user.control");

const router = jsonServer.create();

router.get('/getAllUsers', userController.getAllUsers);

module.exports = router;