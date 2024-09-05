import { commonsConstants, response, usersConstants, successCodes, clientErrorCodes } from 'commons-layer';
import { Mysql, usersQueries } from 'mysql-layer';
import { userToDto } from '../dto/usersToDto.js';

export const get = async (req, res) => {
    try {
        const userId = req.body.id;

        const user = await Mysql.execute(usersQueries.getById, userId);

        if(!user) {
            console.log(`${usersConstants.baseLog} ${commonsConstants.GET} ${commonsConstants.ERROR} ${JSON.stringify(user)} `);
            return response.error(res, req.awsRequestId, null, usersConstants.USERS_NOT_FOUND, clientErrorCodes.NOT_FOUND);
        }

        console.log(`${usersConstants.baseLog} ${commonsConstants.GET} ${JSON.stringify(user)}`);

        const userDTO = userToDto(user);

        return response.success(res, req.awsRequestId, userDTO, usersConstants.USERS_FOUND, successCodes.OK);
    }catch(error) {
        console.error(`${usersConstants.baseLog} ${commonsConstants.ERROR} ${error}`);
        return response.error(res, req.awsRequestId, error, usersConstants.USERS_NOT_FOUND, clientErrorCodes.NOT_FOUND)
    }
}