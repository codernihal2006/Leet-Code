const jwt = require("jsonwebtoken");
const User = require("../models/user");
const redisClient = require("../config/redis");

const userMiddleware = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).send("Error: Token is not present");
        }

        const payload = jwt.verify(token, process.env.JWT_KEY);
        const { _id } = payload;

        if (!_id) {
            return res.status(401).send("Error: Invalid token");
        }

        const result = await User.findById(_id);
        if (!result) {
            return res.status(401).send("Error: User Doesn't Exist");
        }

        if (redisClient.isOpen) {
            try {
                const IsBlocked = await redisClient.exists(`token:${token}`);
                if (IsBlocked) {
                    return res.status(401).send("Error: Invalid Token");
                }
            } catch (redisErr) {
                console.warn("Redis check failed, skipping blacklist check:", redisErr.message);
            }
        }

        req.result = result;
        next();
    } catch (err) {
        return res.status(401).send("Error: " + (err.message || err));
    }
};

module.exports = userMiddleware;
