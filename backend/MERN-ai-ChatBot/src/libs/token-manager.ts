import jwt from 'jsonwebtoken'

export const createToken = (id:string, email:string, expiresIn:string)=>{
    const payload = {id:id, email:email};
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    });
};

