import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { UsersTokens, Mysql, usersTokensQueries } from 'JsTaskManager-mysql-layer'

/**
 * 
 * @param {*} username 
 * @param {*} userId 
 * @returns 
 */
export const generateToken = async (username, userId) => {
    try {

        const payload = {
            username,
        }

        const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '30d'});
        
        const newUserTokens = UsersTokens.createEntity(userId, token);

        await Mysql.execute(usersTokensQueries.add, [
            newUserTokens.userId,
            newUserTokens.token,
            newUserTokens.createdAt
        ]);

        return token;
    }catch(error) {
        console.error(error);
        throw new Error(error);
    }
}