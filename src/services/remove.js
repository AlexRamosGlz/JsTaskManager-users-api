import { commonsConstants, response, usersConstants, successCodes, clientErrorCodes} from 'JsTaskManager-commons-layer';
import { Mysql, usersQueries } from 'JsTaskManager-mysql-layer';
import { userToDto } from '../dto/usersToDto.js';

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const remove = async (req, res) => {
    try {
        const userId = req.params.id;

        const [user] = await Mysql.execute(usersQueries.getById, userId);

        if(!user) {
            console.log(`${usersConstants.BASELOG} ${commonsConstants.GET} ${commonsConstants.ERROR} ${JSON.stringify(user)} `);
            return response.error(res, req.awsRequestId, null, usersConstants.USERS_NOT_FOUND, clientErrorCodes.NOT_FOUND);
        }

        const userDTO = userToDto(user);

        await Mysql.execute(usersQueries.remove, userId);

        return response.success(res, req.awsRequestId, userDTO, usersConstants.USER_DELETED, successCodes.OK);
    }catch(error) {
        console.error(`${usersConstants.BASELOG} ${commonsConstants.ERROR} ${error}`);
        return response.error(res, req.awsRequestId, error, usersConstants.USER_NOT_DELETED, clientErrorCodes.BAD_REQUEST)
    }
}