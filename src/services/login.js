import { response, serverErrorCodes, commonsConstants, usersConstants} from "JsTaskManager-commons-layer";
import { Mysql, usersTokensQueries, UsersToken, usersQueries} from 'JsTaskManager-mysql-layer';
import { userToDto } from "../dto/usersToDto.js";
import { generateToken } from "../middleware/generateToken.js";

export const login = async (req, res) => {
    try {

        const payload = {
            username: req.body.username
        }

        const token = generateToken(payload)

        //TODO store token in DB
        const userId = await Mysql.execute(usersQueries.getIdByUserName, payload.username);
        const newUserTokens = new UsersToken(userId, token);

        await Mysql.execute(usersTokensQueries.add, [
            newUserTokens.userId,
            newUserTokens.token,
            newUserTokens.createdAt
        ])
        
        const userDTO = userToDto(user);
        return response.success(res, req.awsRequestId, {...userDTO, token}, commonsConstants.SUCCESS_LOGIN, successCodes.OK);
    }catch(error) {
        console.log(`${usersConstants.BASELOG}${commonsConstants.ERROR} ${error}`);
        return response.error(res, req.awsRequestId, error, commonsConstants.ERROR_LOGIN, serverErrorCodes.INTERNAL_SERVER_ERROR);
    }
}