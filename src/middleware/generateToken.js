import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const generateToken = (payload) => {
    try {
        return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '30d'});
    }catch(error) {
        console.error(error);
        throw new Error(error);
    }
}