import express, { Router } from 'express';
import UserRouter from './resources/users/routes';

import dbLoader from './loaders/dbLoader';

// eslint-disable-next-line no-unused-vars
import { UserException } from './types/UserException';

const app = express();
const router = Router();

dbLoader();

app.use(express.json());

app.use('/', router);
app.use('/api/users', UserRouter);


router.get('/', (req, res) => {
    res.send('This is simple REST API');
});

// eslint-disable-next-line no-unused-vars
app.use((err: UserException, req: express.Request, res: express.Response, next: express.NextFunction) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    res.status(status).json(message);
});

export default app;
