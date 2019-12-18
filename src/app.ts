import express from 'express';
import { UserController } from './controller/UserController';
class App {
    public app: any;
    public userController: UserController

    constructor() {
        this.app = express();
        this._setConfig();
        this.userController = new UserController(this.app);
    }

    private _setConfig() {
        this.app.use(express.json());
    }
}

export default new App().app;
