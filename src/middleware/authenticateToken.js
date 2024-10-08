import jwt from 'jsonwebtoken';
import { response, commonsConstants, serverErrorCodes, usersConstants, clientErrorCodes} from 'JsTaskManager-commons-layer';

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const authenticateToken = (req, res, next) => {
    try {
        const authHeader =  req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if(!token) {
            console.error(`${usersConstants.BASELOG}`);
            return response.error(res, req.awsResquestId, null,commonsConstants.ERROR, commonsConstants.UNAUTHORIZED, clientErrorCodes.BAD_REQUEST);
        }

        req.user = jwt.verify(token, process.env.TOKEN_SECRET);
        req.token = token;
        next();
    }catch(error) {
        return response.error(res, req.awsResquestId, error, null, serverErrorCodes.INTERNAL_SERVER_ERROR);
    }
}