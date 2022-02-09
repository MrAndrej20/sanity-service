import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import HTTP from "http-status-codes";
import { config } from "../config";
import { codedError } from "./coded-error";

export function authorize() {
    return async (req: Request, res: Response, next: NextFunction) => {
        const authorization = req.get("Authorization");
        if (!authorization) {
            return res
                .status(HTTP.UNAUTHORIZED)
                .send(codedError(HTTP.UNAUTHORIZED, "Missing authorization header"));
        }
        const accessToken = authorization.replace("Bearer ", "").trim();
        if (!accessToken) {
            return res
                .status(HTTP.UNAUTHORIZED)
                .send(codedError(HTTP.UNAUTHORIZED, "Missing authorization token"));
        }
        try {
            jwt.verify(accessToken, config.jwt.secret);
        } catch (err) {
            return res
                .status(HTTP.UNAUTHORIZED)
                .send(codedError(HTTP.UNAUTHORIZED, "Invalid authorization token"));
        }
        return next();
    };
}
