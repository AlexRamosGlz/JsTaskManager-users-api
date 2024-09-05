import serverless from 'serverless-http';
import app from './src/server.js';

const sls = serverless(app);

export const handler = async (event, context) => {
    console.log(`### ${event.requestContext?.http?.method} ${event.requestContext?.http?.path}`);

    return sls(event, context);
}