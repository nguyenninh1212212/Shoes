const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const MiddlewareController = {
    Verify_token: (req, res, next) => {
        const token = req.headers.authorization;
        if (token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    return res.status(403).json("Token is not valid");
                }
                req.user = user;
                next();
            });
        } else {
            res.status(401).json("You're not authenticated");
        }
    },
    Verify_User: async (req, res, next) => {
        MiddlewareController.Verify_token(req, res, () => {
            if (req.user.id_customer == req.params.id_customer ) {
                next();
            } else {
                res.status(403).json("You're not allowed");
            }
        });
    },

};

module.exports = MiddlewareController;
