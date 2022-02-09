import { json as parseJSON } from "body-parser";
import express from "express";

import * as errorHandler from "../lib/async-response-handler";
import { extractUserFromAuthorization } from "../lib/extract-user-from-token";
import { authorize } from "../lib/jwt-authorization";
import { validate } from "../lib/validate";
import { UserManager } from "../models/user-manager";
import { loginUserRequest, signupUserRequest, updateUserRequest } from "../validation";

const app = express();

app.post(
    "/signup",
    parseJSON(),
    validate(signupUserRequest),
    errorHandler.wrap(req => {
        const { body } = req;
        return UserManager.signup(body);
    })
);

app.post(
    "/login",
    parseJSON(),
    validate(loginUserRequest),
    errorHandler.wrap(req => {
        const { body } = req;
        return UserManager.login(body);
    })
);

app.get(
    "/",
    authorize(),
    errorHandler.wrap(req => {
        const user = extractUserFromAuthorization(req.get("Authorization"));
        return new UserManager(user).get();
    })
);

app.put(
    "/",
    authorize(),
    parseJSON(),
    validate(updateUserRequest),
    errorHandler.wrap(req => {
        const user = extractUserFromAuthorization(req.get("Authorization"));
        return new UserManager(user).update(req.body);
    })
);

export const route = app;
