import { commonsConstants, response, usersConstants, successCodes, clientErrorCodes} from 'JsTaskManager-commons-layer';
import { Mysql, usersQueries } from 'JsTaskManager-mysql-layer';
import { userToDto } from '../dto/usersToDto.js';

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const update = async (req, res) => {
    try {
        const userId = req.params.id;

        let [ user ] = await Mysql.execute(usersQueries.getById, userId);

        if(!user) {
            console.log(`${usersConstants.BASELOG} ${commonsConstants.UPDATE} ${commonsConstants.ERROR} ${JSON.stringify(user)} `);
            return response.error(res, req.awsRequestId, null, usersConstants.USERS_NOT_FOUND, clientErrorCodes.NOT_FOUND);
        }

        console.log(`${usersConstants.BASELOG} ${commonsConstants.UPDATE} ${JSON.stringify(user)} `);

        const userToUpdate = { 
            username: req.body.username ?? user.username,
            updatedAt: new Date()
        }

        console.log(`${usersConstants.BASELOG} ${commonsConstants.UPDATE} ${JSON.stringify(userToUpdate)} `);

        await Mysql.execute(usersQueries.update, [
            userToUpdate.username,
            userToUpdate.updatedAt,
            userId
        ]);

        [ user ] = await Mysql.execute(usersQueries.getById, userId);

        const userDTO = userToDto(user);

        return response.success(res, req.awsRequestId, userDTO, usersConstants.USER_UPDATED, successCodes.OK);
    }catch(error) {
        console.error(`${usersConstants.BASELOG} ${commonsConstants.ERROR} ${error}`);
        return response.error(res, req.awsRequestId, error, usersConstants.USER_NOT_UPDATED, clientErrorCodes.BAD_REQUEST)
    }
}