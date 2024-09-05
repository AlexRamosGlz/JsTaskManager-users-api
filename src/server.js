import express from 'express';
import { awsRequestId, commonsConstants, response, successCodes, clientErrorCodes} from 'commons-layer';
import router from './routes/router.js';

const app = express();

app.use(express.json());
app.use(awsRequestId);
app.use('/users/', router);

app.get('/', (req, res) => {
    try{
        response.success(res, req.awsRequestId, commonsConstants.SUCCESS_HEALTCHECK, commonsConstants.SUCCESS, successCodes.OK );
    }catch(error) {
        console.error(`${commonsConstants.ERROR} ${error}`);
        response.error(res, req.awsRequestId, error, commonsConstants.ERROR_HEALTCHECK, clientErrorCodes.BAD_REQUEST);
    }
})



export default app;

