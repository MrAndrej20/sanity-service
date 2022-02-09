import Joi from "joi";



import { NextFunction, Request, Response } from "express";
import HTTP from "http-status-codes";

import { codedError } from "./coded-error";

export function validate(schema: Joi.ObjectSchema): (req: Request, res: Response, next: NextFunction) => Response<unknown, Record<string, unknown>> | void {
    return (req: Request, res: Response, next: NextFunction): Response<unknown, Record<string, unknown>> | void => {
        const { error } = schema.validate(req.body);
        if (!error) {
            return next();
        }
        const errorResponse = codedError(HTTP.BAD_REQUEST, error.stack || error.message);
        console.error(errorResponse);
        res.set({ "Content-Type": "application/json" });
        res.status(errorResponse.code);
        return res.send(errorResponse);
    };
}
