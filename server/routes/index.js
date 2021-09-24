var jsonServer  = require('json-server');
const jwt = require('jsonwebtoken');
const userRouter = require('./user.route');
const bookRouter = require('./book.route');
const userData = require("../mockData/users.json");

const router = jsonServer.create();

router.post('/login', async (req, res, next) => {

    try {
        const email = req.body.email;
        const password = req.body.password;
        const userDetails = userData.find((user) => user.email === email);
    
        if (!email || !password) {
            res.status(400).json({
                message: "Email or Password is required."
            });
            return
        }
        if (userDetails && userDetails.password === password) {
            const payload = {
                userId: userDetails.id,
                username: userDetails.user_name,
                email: userDetails.email
            }
        
            const token = await jwt.sign(payload, "Library16712345@#$");
        
            res.json({
                message: "Token created successfully",
                token,
                userDetails
            });
        } else {
            res.status(400).json({
                message: "User credentials are invalid."
            });
        }
    
    } catch(err) {
        next(err)
    }
});

router.use('/user', userRouter);
router.use('/book', bookRouter)
module.exports = router;