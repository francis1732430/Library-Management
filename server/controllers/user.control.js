const users = require("../mockData/users.json");

const getAllUsers = (req, res) => {

    res.json(users);
};

module.exports = {
    getAllUsers
}