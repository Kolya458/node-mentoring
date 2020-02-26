import express, { Router } from 'express';
import UserRouter from './resources/users/routes';
// eslint-disable-next-line no-unused-vars
import { HttpException } from './types/HttpException';

const app = express();
const router = Router();

app.use(express.json());

app.use('/', router);
app.use('/api/users', UserRouter);


router.get('/', (req, res) => {
    res.send('This is simple REST API');
});

app.use((err: HttpException, req: express.Request, res: express.Response) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    res.status(status).json(message);
});

export default app;
