import { commonsConstants, response, usersConstants, successCodes, clientErrorCodes} from 'JsTaskManager-commons-layer';
import { Mysql, usersQueries, Users, UsersTokens, usersTokensQueries } from 'JsTaskManager-mysql-layer';
import { userToDto } from '../dto/usersToDto.js';
import { login } from './login.js';
import { generateToken } from '../middleware/generateToken.js';

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const create = async (req, res) => {
    try {

        const user = {
            username: req.body.username,
            password: req.password
        }

        const newUser = Users.createEntity(user);

        console.log(`${usersConstants.BASELOG} ${commonsConstants.CREATE} ${JSON.stringify(newUser)}`);
        
        await Mysql.execute(usersQueries.add, [
            newUser.id,
            newUser.username,
            newUser.password,
            newUser.createdAt,
            newUser.updatedAt
        ])

        const token = await generateToken(newUser.username, newUser.id);
 
        const [userCreated] = await Mysql.execute(usersQueries.getById, newUser.id);
        const userDTO = userToDto(userCreated);

        return response.success(res, req.awsRequestId, {...userDTO, token}, usersConstants.USER_CREATED, successCodes.OK);
    }catch(error) {
        console.error(`${usersConstants.BASELOG} ${commonsConstants.CREATE} ${commonsConstants.ERROR} ${error}`);
        return response.error(res, req.awsRequestId, error, usersConstants.USER_NOT_CREATED, clientErrorCodes.BAD_REQUEST)
    }
}