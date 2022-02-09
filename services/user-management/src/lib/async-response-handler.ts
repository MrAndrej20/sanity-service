import { Request, Response } from "express";
import HTTP from "http-status-codes";

import { CodedError } from "./coded-error";

export function wrap(handler: (req: Request, res: Response) => any): (req: Request, res: Response) => Promise<any> {
    return async (req: Request, res: Response) => {
        try {
            const result = await handler(req, res);
            const responseBody = JSON.stringify(result);
            res.set({
                "Content-Type": "application/json",
                "Content-Length": responseBody.length
            });
            res.status(HTTP.OK);
            return res.send(result);
        } catch (err: any) {
            return getErrorHandler(res, err);
        }
    };
}

function getErrorHandler(res: Response, err: CodedError & Error) {
    let code = parseInt((err as any).statusCode || err.code);
    if (typeof code !== "number" || isNaN(code))/* istanbul ignore next */ { // edge case if an unhandled rejection would happen

        code = HTTP.INTERNAL_SERVER_ERROR;
        // tslint:disable-next-line:no-console
        console.error([
            "Unexpected error thrown",
            "Code 500",
            `Message ${err.message}`,
            `Stack ${err.stack}`,
            `Raw ${err}`,
        ].join("\n"));
    }
    res.status(code);
    res.send(err);
}