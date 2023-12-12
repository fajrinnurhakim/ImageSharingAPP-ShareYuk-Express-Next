const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Missing token" });
    }

    const jwtToken = token.split(" ")[1];
    jwt.verify(jwtToken, "secret-key", (err, user) => {
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
