import { commonsConstants, response, usersConstants, successCodes, clientErrorCodes} from 'commons-layer';
import { Mysql, usersQueries, Users } from 'mysql-layer';
import { userToDto } from '../dto/usersToDto.js';

export const create = async (req, res) => {
    try {

        const user = {
            username: req.body.username,
            password: req.body.password
        }

        const newUser = Users.createEntity(user);

        console.log(`${usersConstants.baseLog} ${commonsConstants.CREATE} ${JSON.stringify(newUser)}`);
        
        await Mysql.execute(usersQueries.add, [
            newUser.id,
            newUser.username,
            newUser.password,
            newUser.createdAt,
            newUser.updatedAt
        ])

        const userCreated = userToDto( await Mysql.execute(usersQueries.getById, newUser.id) );

        return response.success(res, req.awsRequestId, userCreated, usersConstants.USER_CREATED, successCodes.OK);
    }catch(error) {
        console.error(`${usersConstants.baseLog} ${commonsConstants.CREATE} ${commonsConstants.ERROR} ${error}`);
        return response.error(res, req.awsRequestId, error, usersConstants.USER_NOT_CREATED, clientErrorCodes.BAD_REQUEST)
    }
}