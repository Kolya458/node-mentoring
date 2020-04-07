import express, { Router } from 'express';
import cors from 'cors';
import UserRouter from './resources/users/routes';
import GroupRouter from './resources/groups/routes';
import AuthRouter from './resources/auth/routes';

import dbLoader from './loaders/dbLoader';
import loggerLoader from './loaders/loggerLoader';

const app = express();
const router = Router();

const logger = loggerLoader('info');
dbLoader();

app.use(cors());
app.use(express.json());

app.use('/', router);
app.use('/api/users', UserRouter);
app.use('/api/groups', GroupRouter);
app.use('/auth', AuthRouter);

router.get('/', (req, res) => {
    res.send('This is simple REST API');
});

// eslint-disable-next-line no-unused-vars
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    const [status, message] = err.message.split(':::') || ['500', 'Something went wrong'];
    res.status(+status).json(message);
    logger.error(message);
});

process
    .on('uncaughtException', e => {
        logger.error(e);
        process.exit(1);
    })
    .on('unhandledRejection', () => {
        logger.error('unhandledRejection');
    });

export default app;
