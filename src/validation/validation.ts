import Ajv from 'ajv';
// eslint-disable-next-line no-unused-vars
import { Request, Response, NextFunction } from 'express';
import userSchema from './schema/userSchema';

const ajv = new Ajv({ allErrors: true, removeAdditional: 'all' });
ajv.addSchema(userSchema, 'user-schema');

const errorResponse = (schemaErrors: Ajv.ErrorObject[] | null | undefined) => {
    const errors = schemaErrors?.map((err: Ajv.ErrorObject) => {
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

export const validate = (schemaName: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const isValid = ajv.validate(schemaName, req.body);
        if (isValid) {
            next();
        } else {
            res.status(400).json(errorResponse(ajv.errors));
        }
    };
};
