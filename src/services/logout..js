import { response, serverErrorCodes, commonsConstants, usersConstants, successCodes, clientErrorCodes } from "JsTaskManager-commons-layer";
import { Mysql, usersQueries, usersTokensQueries } from 'JsTaskManager-mysql-layer';

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const logout = async (req, res) => {
    try {

        const { username } = req.user

        if(!username) {
            return response.error(res, req.awsRequestId, null,  usersConstants.USERS_NOT_FOUND, clientErrorCodes.NOT_FOUND);
        }

        const [ user ] = await Mysql.execute(usersQueries.getIdByUserName, username);

        if(!user ) {
            return response.error(res, req.awsRequestId, null, usersConstants.USERS_NOT_FOUND, clientErrorCodes.NOT_FOUND);
        }
        
        //TODO remove token(s) from DB
        const { token } = req;

        await Mysql.execute(usersTokensQueries.removeToken, [
            user.id,
            token
        ])

        return response.success(res, req.awsRequestId, null, commonsConstants.SUCCESS_LOGOUT, successCodes.OK);
    }catch(error) {
        console.log(`${usersConstants.BASELOG}${commonsConstants.ERROR} ${error}`);
        return response.error(res, req.awsRequestId, error, commonsConstants.ERROR_LOGIN, serverErrorCodes.INTERNAL_SERVER_ERROR);
    }
}