import jwt from 'jsonwebtoken'
export const createToken = (id:string, email:string,expiresIn)=>{
    const paylaod = {
        id:id,
        email:email,
    };
    const token = jwt.sign(paylaod,);
}