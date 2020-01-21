import express, { Router } from 'express';
import UserRouter from './resources/users/routes';
class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.app.use(express.json());
    }

    private routes(): void {
        const router: Router = Router();
        router.get('/', (req, res) => {
            res.send('This is simple REST API');
        });
        this.app.use('/', router);
        this.app.use('/api/users', UserRouter);
    }
}

export default new App().app;
