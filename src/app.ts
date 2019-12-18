import express from 'express';

class App {
    public app: any;

    constructor() {
        this.app = express();
        this._setConfig();
    }

    private _setConfig() {
        this.app.use(express.json());
    }
}

export default new App().app;
