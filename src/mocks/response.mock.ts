// eslint-disable-next-line no-unused-vars
import { Response } from 'express';

export default ({
    json() {
        return this;
    },
    status() {
        return this;
    }
} as unknown) as Response;
