import Ajv from 'ajv';
// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import userSchema from './schema/userSchema';

const ajv = new Ajv({ allErrors: true, removeAdditional: 'all' });
ajv.addSchema(userSchema, 'user-schema');

const errorResponse: Function = (schemaErrors: []): object => {
    const errors = schemaErrors.map((err: any) => {
        return {
            path: err.dataPath,
            message: err.message
        };
    });
    return {
        status: 'failed',
        errors
    };
};

export const validate = (schemaName: string): Function => {
    return (req: Request, res: Response, next: Function) => {
        const isValid: boolean | PromiseLike<any> = ajv.validate(schemaName, req.body);
        if (isValid) {
            // eslint-disable-next-line callback-return
            next();
        } else {
            res.status(400).json(errorResponse(ajv.errors));
        }
    };
};
