import * as JWT from "jsonwebtoken";
import HTTP from "http-status-codes";
import { codedError } from "./coded-error";

export interface JWTPayload {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
}


export function extractUserFromAuthorization(authorizationHeader?: string): JWTPayload {
    if (!authorizationHeader) {
        throw codedError(HTTP.UNAUTHORIZED, "Missing authorization token");
    }
    const token = authorizationHeader.replace("Bearer ", "");
    try {
        return JWT.decode(token) as JWTPayload;
    } catch (err) {
        console.log(err);
        throw codedError(HTTP.UNAUTHORIZED, "Missing authorization token");
    }
}
