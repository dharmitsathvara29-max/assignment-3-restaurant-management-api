const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

    try {

        const token = req.headers.token;

        if (!token) {
            return res.status(401).json({
                message: "Access Denied"
            });
        }

        const decoded = jwt.verify(token, 'key');

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid token"
        });

    }

};

module.exports = authMiddleware;