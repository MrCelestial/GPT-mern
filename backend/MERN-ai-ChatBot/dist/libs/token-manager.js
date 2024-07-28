import jwt from 'jsonwebtoken';
export const createToken = (id, email, expiresIn) => {
    const paylaod = { id: id, email: email };
    const token = jwt.sign(paylaod, process.env.JWT_SECRET);
};
//# sourceMappingURL=token-manager.js.map