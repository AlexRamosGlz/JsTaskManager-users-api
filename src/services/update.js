import { commonsConstants, response, usersConstants, successCodes, clientErrorCodes} from 'commons-layer';
import { Mysql, usersQueries } from 'mysql-layer';
import { userToDto } from '../dto/usersToDto.js';

export const update = async (req, res) => {
    try {
        const userId = req.body.id;

        const user = await Mysql.execute(usersQueries.getById, userId);

        if(!user) {
            console.log(`${usersConstants.baseLog} ${commonsConstants.UPDATE} ${commonsConstants.ERROR} ${JSON.stringify(user)} `);
            return response.error(res, req.awsRequestId, null, usersConstants.USERS_NOT_FOUND, clientErrorCodes.NOT_FOUND);
        }

        console.log(`${usersConstants.baseLog} ${commonsConstants.UPDATE} ${JSON.stringify(user)} `);

        const userToUpdate = { 
            username: req.body.user ?? user.username,
            updatedAt: new Date()
        }

        console.log(`${usersConstants.baseLog} ${commonsConstants.UPDATE} ${JSON.stringify(userToUpdate)} `);

        await Mysql.execute(usersQueries.update, [
            userToUpdate.username,
            userToUpdate.updatedAt
        ])

        const userDTO = userToDto(await Mysql.execute(usersQueries.getById, userId));

        return response.success(res, req.awsRequestId, userDTO, usersConstants.USER_UPDATED, successCodes.OK);
    }catch(error) {
        console.error(`${usersConstants.baseLog} ${commonsConstants.ERROR} ${error}`);
        return response.error(res, req.awsRequestId, error, usersConstants.USER_NOT_UPDATED, clientErrorCodes.BAD_REQUEST)
    }
}