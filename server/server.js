const jsonServer = require("json-server");
const jwt = require('jsonwebtoken');
const server = jsonServer.create();
const router = jsonServer.router(require("./db.js")());
const customRoutes = require("./routes/index");
const userData = require("./mockData/users.json");

const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);

server.use(async (req, res, next) => {

    try {
        if (req.method === 'POST') {
            req.body.createdAt = Date.now();
        } else if (req.method === 'PUT') {
            req.body.updatedAt = Date.now();
        }
        if (req.url === "/api/login") {
            next();
        } else {
            const token = req.headers.authorization;

            if (!token) {
                res.status(400).json({
                    message: "Access token is required."
                });
            } else {
                const profileData = await jwt.verify(token, "Library16712345@#$");
                if (profileData) {
                    const userDetails = userData.find((user) => user.id === profileData.userId);
                    if (userDetails) {
                        req.user = userDetails;
                        next();
                        return
                    }
                }
            }
            res.status(400).json({
                message: "Access token Invalid."
            });
        }
    } catch(err) {
        next(err);
    }
  });

server.get('/create-token', async (req, res) => {
    const payload = {
        userId: 3,
        password: "Vinoth123@",
        username: "vinoth",
        email: "vinothvinoth@yopmail.com"
    }

    const token = await jwt.sign(payload, "Library16712345@#$");

    res.json({
        message: "Token created successfully",
        token
    });
});
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/users/:id': '/user/getAllUsers'
  }));

server.use(customRoutes);
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running')
});
