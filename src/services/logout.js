import { response, serverErrorCodes, commonsConstants, usersConstants, successCodes} from "JsTaskManager-commons-layer";
import { Mysql, usersTokensQueries } from 'JsTaskManager-mysql-layer';

export const logout = async (req, res) => {
    try {
        //TODO remove token(s) from DB
        await Mysql.execute(usersTokensQueries.removeToken, token);

        return response.success(res, req.awsRequestId, null, commonsConstants.SUCCESS_LOGOUT, successCodes.OK);
    }catch(error) {
        console.log(`${usersConstants.BASELOG}${commonsConstants.ERROR} ${error}`);
        return response.error(res, req.awsRequestId, error, commonsConstants.ERROR_LOGIN, serverErrorCodes.INTERNAL_SERVER_ERROR);
    }
}