import jwt from 'jsonwebtoken';
export const createToken = (id, email, expiresIn) => {
    const payload = { id: id, email: email };
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    });
};
//# sourceMappingURL=token-manager.js.map