import { response, commonsConstants, clientErrorCodes, successCodes, usersConstants} from 'JsTaskManager-commons-layer';
import { Mysql, usersQueries } from 'JsTaskManager-mysql-layer';

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const list = async (req, res) => {
    try {
        const users = await Mysql.execute(usersQueries.list);
        console.log(`${usersConstants.BASELOG} ${commonsConstants.LIST} ${users}`);
        
        return response.success(res, req.awsRequestId, users, usersConstants.USERS_FOUND, successCodes.OK);
    }catch(error) {
        console.error(`${usersConstants.BASELOG} ${commonsConstants.LIST} ${commonsConstants.ERROR} ${error}`);
        return response.error(res, req.awsRequestId, error, usersConstants.USERS_NOT_FOUND, clientErrorCodes.BAD_REQUEST)
    }
} 