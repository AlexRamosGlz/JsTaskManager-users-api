import bcrypt from 'bcrypt';
import { response, usersConstants, commonsConstants, serverErrorCodes, clientErrorCodes} from 'JsTaskManager-commons-layer';

export const hashPassword = (req, res, next) => {
    try {

        const { password } = req.body;

        const salt = bcrypt.genSaltSync(10);
        req.password = bcrypt.hashSync(password, salt); 

        return next();
    }catch(error) {
        console.error(`${usersConstants.BASELOG} ${commonsConstants.ERROR} ${error}`);
        return response.error(res, req.awsRequestId, error, commonsConstants.ERROR, serverErrorCodes.INTERNAL_SERVER_ERROR);
    }
}

export const comparePassword = (password, hash) => {
    try {
        if(!bcrypt.compareSync(password, hash)) throw new Error(`Password don't match`);
    }catch(error) {
        console.error();
        response.error(res, awsRequestId, error, commonsConstants.ERROR, clientErrorCodes.FORBIDDEN);
    }
}