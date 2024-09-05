import { response, commonsConstants, clientErrorCodes, successCodes, usersConstants} from 'commons-layer';
import { Mysql, usersQueries } from 'mysql-layer';

export const list = async (req, res) => {
    try {
        const users = await Mysql.execute(usersQueries.list);
        console.log(`${usersConstants.baseLog} ${commonsConstants.LIST} ${users}`);
        
        return response.success(res, req.awsRequestId, users, usersConstants.USERS_FOUND, successCodes.OK);
    }catch(error) {
        console.error(`${usersConstants.baseLog} ${commonsConstants.LIST} ${commonsConstants.ERROR} ${error}`);
        return response.error(res, req.awsRequestId, error, usersConstants.USERS_NOT_FOUND, clientErrorCodes.BAD_REQUEST)
    }
} 