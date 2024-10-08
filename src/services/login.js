import { response, serverErrorCodes, commonsConstants, usersConstants, clientErrorCodes, successCodes} from "JsTaskManager-commons-layer";
import { Mysql, usersTokensQueries, UsersTokens, usersQueries} from 'JsTaskManager-mysql-layer';
import { userToDto } from "../dto/usersToDto.js";
import { generateToken } from "../middleware/generateToken.js";

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const login = async (req, res) => {
    try {
        let user;
        const { username } = req.body;

        [ user ] = await Mysql.execute(usersQueries.getIdByUserName, username);

        if(!user) {
            console.error(`${usersConstants.BASELOG}[login()]${usersConstants.USERS_NOT_FOUND}`);
            return response.error(res, req.awsRequestId, null, usersConstants.USERS_NOT_FOUND, clientErrorCodes.NOT_FOUND);
        }
        
        const token = await generateToken(username, user.id);

        user = await Mysql.execute(usersQueries.getById, user.id);

        const userDTO = userToDto(user);
                
        return response.success(res, req.awsRequestId,  {...userDTO, token}, commonsConstants.SUCCESS_LOGIN, successCodes.OK);
    }catch(error) {
        console.log(`${usersConstants.BASELOG}${commonsConstants.ERROR} ${error}`);
        return response.error(res, req.awsRequestId, error, commonsConstants.ERROR_LOGIN, serverErrorCodes.INTERNAL_SERVER_ERROR);
    }
}