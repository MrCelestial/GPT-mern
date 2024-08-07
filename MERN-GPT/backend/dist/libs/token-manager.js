import jwt from 'jsonwebtoken';
import { COOKIE_NAME } from "./constants.js";
export const createToken = (id, email, expiresIn) => {
    const payload = { id: id, email: email };
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    });
};
export const verifyToken = async (req, res, next) => {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    console.log(token);
    if (!token || token.trim() == "") {
        return res.status(401).json({ message: "No token provided" });
    }
    return new Promise((resolve, reject) => {
        return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                reject(err);
                return res.status(401).send({ error: "Unauthorized" });
            }
            else {
                console.log("Token verification successful");
                resolve();
                res.locals.jwt_token = decoded;
                return next();
            }
        });
    });
};
//# sourceMappingURL=token-manager.js.map