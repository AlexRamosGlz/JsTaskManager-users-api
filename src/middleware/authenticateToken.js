import jwt from 'jsonwebtoken';
import { response, commonsConstants, serverErrorCodes, usersConstants} from 'JsTaskManager-commons-layer';

export const authenticateToken = (req, res, next) => {
    try {
        const authHeader =  req.header['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if(!token) {
            console.error(`${usersConstants.BASELOG}`);
            return response.error(res, req.awsResquestId, null,commonsConstants.ERROR, commonsConstants.UNAUTHORIZED);
        }

        req.user = jwt.verify(token, process.env.TOKEN_SECRET);
        next();
    }catch(error) {
        return response.error(res, req.awsResquestId, error, null, serverErrorCodes.INTERNAL_SERVER_ERROR);
    }
}